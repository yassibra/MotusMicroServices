
<script>
    import Nav from '../Nav.svelte';
    import Footer from '../Footer.svelte'
    import Breadcrumbs from '../Breadcrumbs.svelte';
    import Cookies from 'js-cookie';
    import {push, pop, replace} from "svelte-spa-router";
  //   if (!(Cookies.get('connecte'))){
  //   //replace('/connexion');
  //   console.log("DANS PAGE MOTUS SVELTE")
  // } else{
  //   console.log('ici');
  // }
  let promise = "";
  if(Cookies.get('connecte') == undefined){ 
    console.log('je ne suis pas connecté'); 
    replace('/connexion');
  } else{  
    console.log(Cookies.get('connecte'));
    promise = getData();
    let motactuel = "";
    async function getData() {
        const res = await fetch(`http://localhost:9000/essai/fromtoken`, {
          credentials: 'include'
         
	});
        
        const text = await res.json();
        console.log(text);
        if (res.ok) {
            console.log(text);
           // motactuel = text;
            return text;
        } else {
          if(text.message){
            console.log(text.message);
            let text2 = {"username":"Moi","essai":0,"game":0,"victory":0};
            console.log('bien ici');
            return text2;
          }
          //console.log(text.message)
          console.log('ici');
          let text2 = {"username":"Moi","essai":0,"game":0,"victory":0};
            return text2;
        }
        
    }
  }
    // Cookies.set('test','valeur')
    // let nom = getCookie("test")
    </script>
    
        <Nav chemin={"score"}/>
        
       <Breadcrumbs chemin={"score"}/>
       <div id="divscore" class="min-h-[55%]">  
       {#await promise}
        <div class="container flex justify-center mx-auto pt-16">
          <div class="mx-autoflex items-center justify-center ">
            <div class="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin">
            </div>
          </div>
        </div>
       {:then user}

        <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div class="grid grid-cols-2 row-gap-8 md:grid-cols-4">
            <div class="text-center md:border-r">
              <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">{user.game}</h6>
              <p class="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                Parties
              </p>
            </div>
            <div class="text-center md:border-r">
              <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">{user.essai}</h6>
              <p class="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                Essais
              </p>
            </div>
            <div class="text-center md:border-r">
              <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">{user.victory}</h6>
              <p class="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                Victoires
              </p>
            </div>
            <div class="text-center">
              <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">{user.victory == '0' ? 0 : user.essai/user.victory}</h6>
              <p class="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                Essais par victoires
              </p>
            </div>
          </div>
        </div>
        {/await}
      </div>
        <Footer/>

      
<style>
 #divscore{
  min-height: 54vh;
 }

</style>