<script>
  import Cookies from 'js-cookie';
  import Nav from './Nav.svelte';
  import Footer from './Footer.svelte'
  import Breadcrumbs from './Breadcrumbs.svelte';
  import Body from './Body.svelte';
  import {push, pop, replace} from "svelte-spa-router";
  
  if((Cookies.get('connecte') == undefined)){
    replace('/connexion')
  }
</script>

<main class="relative">
  <Nav chemin={"accueil"}/>
  <div id="divgrande"> 
   
      <Breadcrumbs chemin={"Jouer"}/> 
      <div class="mt-14" id="mydiv">
      <Body/>
   
<!-- Put this part before </body> tag -->
  <Footer/>
  <!-- The button to open modal -->


</main>

<style>
  #mydiv{
    position: relative;
  }
  #divgrande{
    min-height: 54vh;
  }
</style>