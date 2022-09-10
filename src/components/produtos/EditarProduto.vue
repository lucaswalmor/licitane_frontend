<template>
    <div>
      <Header />
      <div class="container">
        <div class="row mt-4 text-secondary">
          <h2>Editar Produto</h2>
        </div>
  
        <div class="row mt-3">
          <!-- Formulário de cadastro de produto -->
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
              <button class="btn btn-success mt-5" @click="editarProduto">Envicar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '../geral/Header.vue';
  import { useToast } from "vue-toastification";
  
  export default {
      name: 'EditarProduto',
      components: { Header },
      data() {
        return {
          cod_produto: '',
          nome_produto: '',
          valor_produto: '',
          estoque_produto: '',
          id_produto: ''
        }
      },
      methods: {
        produto() {
          // id do produto requisitado para edição
          let id = this.$route.params.id

          // traz os dados do backend
          this.axios(`http://127.0.0.1:8000/api/products/${id}`)
          .then((res) => {
            // preenche os campos com os dados do backend para editar 
            this.cod_produto = res.data.cod_produto
            this.nome_produto = res.data.nome_produto
            this.valor_produto = res.data.valor_produto
            this.estoque_produto = res.data.estoque_produto
          });
        },
        editarProduto() {
          let id = this.$route.params.id
          const toast = useToast();
          if(this.cod_produto == '' || this.nome_produto == '' ||
          this.valor_produto == '' || this.estoque_produto == '') {
            toast.error(`Preencha todos os campos`);
          } else {
            // array de dados para envio de requisição
            const data = {
              cod_produto: this.cod_produto,
              nome_produto: this.nome_produto,
              valor_produto: this.valor_produto,
              estoque_produto: this.estoque_produto,
            }
            
            // api para envio de requisição para edição de produto
            this.axios({
              url: `http://127.0.0.1:8000/api/products/${id}`,
              method: 'PUT',
              data: data
            }).then((res) => {
              if(res.status == 200) toast.success(`Cadastro realizado com Sucesso`);
              this.$router.push('/listar-produto')
            })
          }
        }
      },
      created() {
        this.produto();
      }
  }
  </script>
  
  <style>
  
  </style>