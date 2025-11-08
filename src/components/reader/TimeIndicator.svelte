<script>
  function getFormattedTime() {
    const d = new Date();
    return `${d.getHours().toLocaleString()}:${d.getMinutes().toLocaleString()}`;
  }

  let currentTime = $state(getFormattedTime());

  setInterval(async () => {
    currentTime = getFormattedTime();
  }, 5000);
</script>

<span><time>{currentTime}</time></span>
