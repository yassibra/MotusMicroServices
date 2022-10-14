<script>

  import MOTUS from './Motus.svelte';
  import Connexion from './module_connexion/Connexion.svelte';
  import CreerCompte from './module_compte/CreerCompte.svelte';
  import Score from './module_score/Score.svelte';
  import Pourquoi from './module_pourquoi/pourquoi.svelte';
  import Regle from './module_regle/regle.svelte';
  import Router from 'svelte-spa-router';
</script>

<Router routes={{
  '/': MOTUS,
  '/connexion': Connexion,
  '/creercompte': CreerCompte,
  '/score': Score,
  '/pourquoi': Pourquoi,
  '/regles': Regle
}}
/>
<hr>

