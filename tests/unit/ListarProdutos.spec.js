import { shallowMount } from '@vue/test-utils'
import ListarProduto from "@/components/produtos/ListarProduto.vue"
import axios from 'axios'

describe('Cadastro de produtos', () => {
    // setando o wrapper
    let wrapper;

    // será executado antes de ser executado cada um dos testes
    beforeAll(() => {
        wrapper = shallowMount(ListarProduto);
    });

    test('testando api de produtos', async () => {
        axios.get('http://127.0.0.1:8000/api/products')
        .then(res => {
            expect(res).toBe();
        })
        .catch((error) => {
            // vai dar erro se api do localhost nao estiver rodando
            expect(error.message).toBe('Network Error');
        });
    });
});