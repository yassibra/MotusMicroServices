<script>
	export let chemin;
  
</script>
  <div class="justify-center flex m-4">
    <nav class="flex" aria-label="Breadcrumb">
        <ol  class="flex overflow-hidden text-gray-700 border border-gray-100 rounded-lg">
        <li class="flex items-center">
            <a class="flex items-center h-10 px-4 text-sm font-medium transition-colors bg-gray-100 hover:text-gray-900" href="/">
            Motus
            </a>
        </li>
    
        <li class="relative flex items-center">
            <span class="absolute inset-y-0 w-4 h-10 bg-gray-100 -left-px clip"> </span>
    
            <a
            class="flex items-center h-10 pl-8 pr-4 text-sm font-medium transition-colors bg-white-100 hover:text-gray-900"
            href="{chemin == 'pourquoi' ? '/#/pourquoi' : chemin == 'creercompte' ? '/#/connexion' : chemin == 'regles' ? '/#/regles' :chemin == 'score' ? '/#/score' :  ''}"
            >
            {chemin.charAt(0).toUpperCase() + chemin.slice(1)}
            </a>
        </li>
       
        </ol>
    </nav>
</div>
  <style>
    .clip {
      clip-path: polygon(0 0, 0% 100%, 100% 50%);
    }
  </style>
  