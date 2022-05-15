const shareGameLink = async (gameLink: string) => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    try {
      await navigator.share({ url: gameLink });
    } catch (err) {
      try {
        await navigator.clipboard.writeText(gameLink);
      } catch (err) {
        if (err instanceof Error && !err.toString().includes('AbortError'))
          alert('your borwser does not support sharing, try manualy copying the link');
      }
    }
  } else {
    navigator.clipboard.writeText(gameLink);
  }
};

export default shareGameLink;
