json_fetch = new Vue({
  el: '#vue-app',
  data: {
    result: [],
    errors: [],
  },
  methods: {
    json_fetch(url) {
      axios.get(url).then((response) => {
        this.result.push({
          title: response.title,
          body: response.body
        });
        swal("Marvelous!", `You have registered successfully.`, "success");
      }).catch(e => { swal("Ooops!", `There was an error. ${e}`, "error") });
    }
  }
});