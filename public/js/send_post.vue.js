send_post = new Vue ({
  el: '#vue-app',
  data: {
    result: [],
    errors: [],
  },
  methods: {
    sendPost: function (url) {
      const str = JSON.stringify(this.postBody);
      axios.post(url, str).then((response) => {
        this.result.push({
          title: response.title,
          body: response.body
        });
        swal("Marvelous!", `You have registered successfully.`, "success")
      }).catch(e => {swal("Ooops!", `There was an error. ${e}`, "error")});
    }
  }
});