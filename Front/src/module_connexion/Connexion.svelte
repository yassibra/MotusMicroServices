
<script>
import Nav from '../Nav.svelte';
import Footer from '../Footer.svelte'
import Breadcrumbs from '../Breadcrumbs.svelte';
import Cookies from 'js-cookie';

import {push, pop, replace} from "svelte-spa-router";
if(Cookies.get('connecte') != undefined){
  replace('/score');
}
async function connexion() {
  let username = document.getElementById('email').value;
  let mdp = document.getElementById('password').value;
  
  if(mdp!= ""){
    console.log(username);
    const res = await fetch('http://localhost:5000/generateTokenAvecMDP', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      username,
      mdp
    }), 
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
    })

    const json = await res.json();
    const result = await JSON.stringify(json);
    if (json.result){
      if(json.result == 'connecte'){
          console.log(json.result)
          await Cookies.set('connecte','true');
          replace('/')
        } else{
          alert("Le mail ou le mot de passe n'a pu être identifié.")
        }
    }
    else{
        alert("Le mail ou le mot de passe n'a pu être identifié.");
    }
    }
  else{
    alert("Veuillez saisir un mot de passe.");
    }
  
  
}
  
</script>
<main class="relative">
    <Nav chemin={"connexion"}/>
   <Breadcrumbs chemin={"connexion"}/> 
    <!--
  This component uses @tailwindcss/forms

  yarn add @tailwindcss/forms
  npm install @tailwindcss/forms

  plugins: [require('@tailwindcss/forms')]
-->

<div class="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
    <div class="max-w-lg mx-auto">
      <h1 class="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">Connectez-vous !</h1>
  
      <p class="max-w-md mx-auto mt-4 text-center text-gray-500">
        Accedez à votre espace pour jouez et sauvegarder votre score !
      </p>
  
      <form action="" class="p-8 mt-6 mb-0 rounded-lg shadow-2xl space-y-4">
        <p class="text-lg font-medium">Connectez vous à votre compte</p>
  
        <div>
          <label for="email" class="text-sm font-medium">Email</label>
  
          <div class="relative mt-1">
            <input
              type="email"
              id="email"
              class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Entrez votre email"
            />
  
            <span class="absolute inset-y-0 inline-flex items-center right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>
  
        <div>
          <label for="password" class="text-sm font-medium">Mot de passe</label>
  
          <div class="relative mt-1">
            <input
              type="password"
              id="password"
              class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Entrez votre mot de passe"
            />
  
            <span class="absolute inset-y-0 inline-flex items-center right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
  
        <button on:click={connexion} class="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">
          Se connecter
        </button>
  
        <p class="text-sm text-center text-gray-500">
          Pas de compte ? Pas de panique. 
          <a class="underline" href="/#/creercompte">Creer un compte</a>
        </p>
      </form>
    </div>
  </div>    
  
    <Footer/>
  </main>
  