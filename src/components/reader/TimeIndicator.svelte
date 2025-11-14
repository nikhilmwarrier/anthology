<script>
  function getFormattedTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  let currentTime = $state(getFormattedTime());

  setInterval(async () => {
    currentTime = getFormattedTime();
  }, 5000);
</script>

<span><time>{currentTime}</time></span>
