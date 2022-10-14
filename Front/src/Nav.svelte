<script>
import Cookies from 'js-cookie';
export let chemin;

async function handleClick() {
		Cookies.remove('connecte')
    const res = await fetch('http://localhost:5000/deconnexion', {
			method: 'POST',
		  credentials: 'include'
	  })
	}
</script>
<nav class="bg-white shadow dark:bg-gray-800">
  <div class="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
      <a href="/" class="hover:border-b-2 text-gray-800 transition-colors duration-300 transform dark:text-gray-200  hover:border-blue-500 {chemin == 'accueil' ? 'border-b-2 border-blue-500' : ''} ">Motus</a>
      <a href="#/pourquoi" class=" hover:border-b-2 hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 mx-1.5 sm:mx-6  hover:border-blue-500 {chemin == 'pourquoi' ? 'border-b-2 border-blue-500' : ''} ">Pourquoi le projet</a>

      

      <a href="#/regles" class="hover:border-b-2  hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200  hover:border-blue-500 {chemin === 'regles' ? 'border-b-2 border-blue-500' : ''} mx-1.5 sm:mx-6">Règles</a>

      {#if Cookies.get('connecte') == undefined} 
       <a href="#/connexion" class="hover:border-b-2  hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 {chemin == 'connexion' ? 'border-b-2 border-blue-500' : ''} mx-1.5 sm:mx-6">Se connecter</a>

      {:else}
      <a href="#/score" class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Score</a>

      <a href="/" on:click={handleClick} class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Me deconnecter</a>
      {/if}
     
      
  </div>
</nav>