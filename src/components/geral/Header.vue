<template>
<div class="container-fluir">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link active" to="/"><i class="pe-2 fa-solid fa-house"></i> Home</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="pe-2 fa-sharp fa-solid fa-shop"></i> Produtos
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><router-link class="dropdown-item" to="/listar-produto">Listar produto</router-link></li>
                        <li><router-link class="dropdown-item" to="/cadastrar-produto">Cadastrar produto</router-link></li>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>