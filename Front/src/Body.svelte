
<script>
    import Cookies from "js-cookie";
    import { replace } from "svelte-spa-router";


let tour = 0;
let partietermine = "";

function Onkeyup(event) {
	if(!(event.keyCode==8 || event.keyCode==9)){
		event.srcElement.value = event.srcElement.value.toUpperCase();
		let next_letter_id = parseInt(event.srcElement.id.substring(2)) + 1;
		
		document.getElementById(tour+"_"+next_letter_id).focus();

	} 
	this.value.toUpperCase();
}
async function  redirectionScore (){
	await replace('/score')
}
let promise = getMotAleatoire();
let motactuel = "";
async function getMotAleatoire() {
	const res = await fetch(`http://localhost:4000/retrouvermot`);
	const text = await res.json();
	if (res.ok) {
		console.log(text)
		motactuel = text;
		return text.mot;
	} else {
		return 10;
	}
}

function handleClick() {
	tour = 1;
	promise = getMotAleatoire();
}
async function  verifierMot (){
	//id = tailetour * tour + i
	//bloquer les (tour * motactuel.mot.length) - motactuel.mot.length anciennes lettres

	var saisie = '';
	for(var i = 0; i <motactuel.mot.length; i++){
	saisie += document.getElementById(tour+"_"+i).value;
	}

	
	 const res = await fetch('http://localhost:4000/comparermot2', {
			method: 'POST',
			body: JSON.stringify({
				mot: saisie,
				tour: tour
		}),
		credentials: 'include',
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${Cookies.get('jwt')}`
			}
	})
	
	const text = await res.json();
	console.log(text)
	if(!(text.status == undefined)){
		console.log('je suis là ')		
		if(text.status == "Terminee" && text.victory == "True"){
			for(var i = 0; i <motactuel.mot.length; i++){
				document.getElementById(tour+"_"+i).style.background = 'green';
				partietermine = "victoire";
				
				//gagné
			}
		} else{
			partietermine = "defaite";
			//perdu
		}
	} else {
			for(var i = 0; i <motactuel.mot.length; i++){
				document.getElementById(tour+"_"+i).readOnly = true;
				document.getElementById(tour+"_"+i).style.background = 'red';
				//dabord met la couleure orange :-> if x in lettre alors set orange
				if(text.lettres.includes(document.getElementById(tour+"_"+i).value)){
					document.getElementById(tour+"_"+i).style.background = 'orange';
				}
				if(document.getElementById(tour+"_"+i).value == text.motretourne.charAt(i)){
					document.getElementById(tour+"_"+i).style.background = 'green';
					document.getElementById(tour+1+"_"+i).value = document.getElementById(tour+"_"+i).value;
					document.getElementById(tour+1+"_"+i).readOnly = true;
				}
				//met la couleure noire et fige :-> if tableau*[i] = documentgetE...Id.value = couleur noire
				
			}
		}
	
	//mettre les couleurs.
	tour = tour + 1;
	//placez les nouvelles lettres et les figés.
	
}
</script>



{#await promise}
<div class="container flex justify-center mx-auto pt-16">
	<div class="mx-autoflex items-center justify-center ">
	  <div class="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin">
	  </div>
	</div>
  </div>
{:then mot}

<!--for i allant de 0 à number je construis des bloc de lettres 6 fois-->
<div class="flex ">
<div id="blockmotus">
	
	{#each Array(6) as _, index}
		{#each mot as l, i}
		{#if l != '*'}
		<input autocomplete="off" on:keyup={Onkeyup} id={index}_{i} class="box-content mr-3 mb-3 h-4 w-4 p-4 border-4" type="text" value={l} readonly="readonly" maxlength="1" pattern="[A-Za-z]{1}" title="Please enter only one letter"/>
		
		{:else}
		<input autocomplete="off" on:keyup={Onkeyup} id={index}_{i} class="box-content mr-3 mb-3 h-4 w-4 p-4 border-4" type="text" maxlength="1" pattern="[A-Za-z]{1}" title="Please enter only one letter"/>
		
		{/if}
		{/each}
		<br/>
	{/each}
	<p></p>
</div>
</div>
{:catch error}
	<p style="color: red">Bug</p>
{/await}


{#if tour == 0}
<button id="mybutton" on:click={verifierMot}
  class="block p-[2px] rounded-full mt-12 mx-auto bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:text-white active:text-opacity-75 focus:outline-none focus:ring"
  
>
  <span
    class="block px-6 py-3 text-sm font-medium text-center bg-white rounded-full hover:bg-transparent"
  >
    Commencer
  </span>
</button>
{:else if partietermine == "victoire"}
<button id="mybutton" on:click={redirectionScore}
  class="block p-[2px] rounded-full mt-12 mx-auto bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:text-white active:text-opacity-75 focus:outline-none focus:ring"
  
>
  <span
    class="block px-6 py-3 text-sm font-medium text-center bg-white rounded-full hover:bg-transparent"
  >
    Gagné ! Voir mon score
  </span>
</button>
{:else if partietermine == "defaite"}
<button id="mybutton"  on:click={redirectionScore}
  class="block p-[2px] rounded-full mt-12 mx-auto bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:text-white active:text-opacity-75 focus:outline-none focus:ring"
  
>
  <span
    class="block px-6 py-3 text-sm font-medium text-center bg-white rounded-full hover:bg-transparent"
  >
    Perdu ! Voir mon score
  </span>
</button>
{:else}
<button on:click={verifierMot}
  class="block p-[2px]  mt-12 rounded-full mx-auto bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:text-white active:text-opacity-75 focus:outline-none focus:ring"
>
  <span
    class="block px-6 py-3 text-sm font-medium text-center bg-white rounded-full hover:bg-transparent"
  >
    Verifier le mot
  </span>
</button>
{/if}

<style>
	#blockmotus {
		margin: 0 auto;
		margin-bottom: 20px;
		position: center;
		
		/* width: 630px; */
	}
	#blockspinner {
		margin-left: 48%;
		margin-bottom: 20px;
		position: center;
	}
</style>