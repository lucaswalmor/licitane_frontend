import { shallowMount } from '@vue/test-utils'
import CadastrarProduto from "@/components/produtos/CadastrarProduto.vue"
import axios from 'axios'

describe('Cadastro de produtos', () => {
    // setando o wrapper
    let wrapper;

    // será executado antes de ser executado cada um dos testes
    beforeAll(() => {
        wrapper = shallowMount(CadastrarProduto);
    });

    test('Cadastrar Produto', async () => {
      // testando se o componente existe
      expect(wrapper.exists()).toBe(true)
  
      // verficando se existe os inputs
      wrapper.find('#cod_produto').text();
      wrapper.find('#nome_produto').text();
      wrapper.find('#valor_produto').text();
      wrapper.find('#estoque_produto').text();
      wrapper.find('#estados').text();
      wrapper.find('#cidades').text();
    });
      
    test('Verificando se os dados foram todos preenchidos corretamente', async () => {
      // testando valores aleatorios para os inputs
      const textInput = wrapper.find('input[type="text"]')
      await textInput.setValue('valores aleatorios')
    
      expect(wrapper.find('input[type="text"]').element.value).toBe('valores aleatorios')
    });

    test('testando api de estados', async () => {
      axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/");
    });

    test('Testando api de envio de dados para cadastro de produto', async () => {
      const data = {
        cod_produto: '123456',
        nome_produto: 'cadeira',
        valor_produto: 150.00,
        estoque_produto: 15,
        cidade: 'Uberaba',
        estado: 'Minas Gerais',
      }

      axios.post({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/products',
        data: data
      }).then(function (response) {
        if(response.status == 200) {
            expect(res).toBe();
        }
      });
    });
});