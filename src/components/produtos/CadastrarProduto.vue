<template>
  <div>
    <Header />
    <div class="container">
      <div class="row mt-4 text-secondary">
        <h2>Cadastrar Produto</h2>
      </div>

      <div class="row mt-3">
        <div class="container">
            <div class="row col-md-4">
              <label for="cod_produto" class="form-label pt-3">Código</label>
              <input type="text" class="form-control" v-model="cod_produto">
            </div>
            <div class="row col-md-4">
              <label for="nome_produto" class="form-label pt-3">Nome</label>
              <input type="text" class="form-control" v-model="nome_produto">
            </div>
            <div class="row col-md-4">
              <label for="valor_produto" class="form-label pt-3">Preço</label>
              <input type="number" step="0.01" class="form-control" v-model="valor_produto">
            </div>
            <div class="row col-md-4">
              <label for="estoque_produto" class="form-label pt-3">Qtd. Estoque</label>
              <input type="text" class="form-control" v-model="estoque_produto">
            </div>
            <div class="row col-md-4">
              <label for="estados" class="form-label pt-3">Estados</label>
              <select class="form-select" v-model="estado" @change="estadosCidades($event)">
                <option value="" disabled>-- Selecione</option>
                <option v-for="estado in estados" :key="estado.id">{{estado.nome}}</option>
              </select>
            </div>
            <div class="row col-md-4" v-show="temCidades">
              <label for="cidades" class="form-label pt-3">Cidades</label>
              <select class="form-select" v-model="cidade" @change="estadosCidades($event)">
                <option value="" disabled>-- Selecione</option>
                <option v-for="cidade in cidades" :key="cidade.id">{{cidade.nome}}</option>
              </select>
            </div>
            <button class="btn btn-success mt-5" @click="cadastrarProduto">Envicar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../geral/Header.vue';
import { useToast } from "vue-toastification";

export default {
    name: 'CadastrarProduto',
    components: { Header },
    data() {
      return {
        cod_produto: '',
        nome_produto: '',
        valor_produto: '',
        estoque_produto: '',
        id_cidade: '',
        estados: [],
        cidades: [],
        estado: '',
        cidade: '',
        temCidades: false
      }
    },
    methods: {
      estadosCidades(event) {
        // api de estados 
        this.axios("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
        .then((res) => {
          res.data.sort(function (obj1, obj2) {
            return obj1.nome < obj2.nome ? -1 :
            (obj1.nome > obj2.nome ? 1 : 0);
          });
          this.estados = res.data;

          // traz o estado selecionado
          const option = event.target.value;

          for(let item in res.data) {
            if(res.data[item].nome == option) {
              // traz o id do estadado para buscar as cidades 
              let id = res.data[item].id

              // api de cidades 
              this.axios(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
              .then((cidades) => {
                this.cidades = cidades.data;
                this.temCidades = true;
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      },
      cadastrarProduto() {
        const toast = useToast();
        if(this.cod_produto == '' || this.nome_produto == '' ||
        this.valor_produto == '' || this.estoque_produto == '' || this.cidade == '') {
          toast.error(`Preencha todos os campos`);
        } else {
          // array de dados a ser enviado para cadastro 
          const data = {
            cod_produto: this.cod_produto,
            nome_produto: this.nome_produto,
            valor_produto: this.valor_produto,
            estoque_produto: this.estoque_produto,
            cidade: this.cidade,
            estado: this.estado,
          }

          // fetch para envio de dados ao backend
          this.axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/products',
            data: data
          }).then(function (response) {
            if(response.status == 200) {
              toast.success(`Cadastro realizado com sucesso!`);
            }
          }).catch(function (error) {
            if(error.response.status == 422) {
              toast.error(`Nome do produto já existe!`);
            }
          });
          
          // limpar os dados após o cadastro ser realizado
          this.cod_produto = ''
          this.nome_produto = ''
          this.valor_produto = ''
          this.estoque_produto = ''
          this.cidade = ''
          this.estado = ''
          this.temCidades = false
        }
      }
    },
    created() {
      this.estadosCidades();
    }
}
</script>

<style>

</style>