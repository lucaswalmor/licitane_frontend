<template>
    <div>
        <Header />
        <div class="container">
            <div class="row mt-4 text-secondary">
                <h2>Produtos</h2>
            </div>
            <div class="row">
                <!-- tabela com produtos cadastrados -->
                <table class="table table-striped text-center mt-3 table-hover">
                    <thead class="table-dark">
                        <tr>
                            <td>Cod.</td>
                            <td>Nome</td>
                            <td>Valor</td>
                            <td>Estoque</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in listaProdutos" :key="item.id">
                            <td>{{item.cod_produto}}</td>
                            <td>{{item.nome_produto}}</td>
                            <td>{{item.valor_produto}}</td>
                            <td>{{item.estoque_produto}}</td>
                            <td class="d-flex icons">
                                <div>
                                    <a href="#" @click="editar(item.id)"><i class="fa-solid fa-pen"></i></a>
                                </div>
                                <div>
                                    <a href="#" @click="deletar(item.id)"><i class="text-danger fa-solid fa-trash"></i></a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            listaProdutos: []
        }
    },
    methods: {
        listarProdutos() {
            // api com dados dos produtos cadastrados
            this.axios('http://127.0.0.1:8000/api/products')
            .then((res) => {
                if(res.status == 200) {
                    // preenche o array de produtos para listar na tabela
                    this.listaProdutos = res.data;
                }
            });
        },
        editar(id) {
            // rota para editar o produto
            this.$router.push({path: `/editar-produto/${id}`, params: {id: id}});
        },
        deletar(id) {
            const toast = useToast();

            // api para enviar requisicao de deletar produto
            this.axios({
                method: 'DELETE',
                url: `http://127.0.0.1:8000/api/products/${id}`,
            }).then(function (response) {
                if(response.status == 200) toast.success(`Produto deletado com Sucesso`);
                location.reload();
            });
        }
    },
    created() {
        this.listarProdutos();
    },
}
</script>

<style scoped>
.icons {
    justify-content: space-evenly;
}
</style>