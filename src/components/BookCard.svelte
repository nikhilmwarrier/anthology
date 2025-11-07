<script>
  import { Link } from "framework7-svelte";
</script>

<div class="book-card">
  <Link href="/read/test/">
    <div>
      <img src="/cover.jpg" alt="Cover" />
    </div>
  </Link>
</div>

<style>
  .book-card {
    width: 100%;
    height: fit-content;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
</style>
