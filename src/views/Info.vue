<template>
  <div class="news">
    <h2>Info</h2>
      
        <div v-if="results"><p>
          <strong>{{results.title}}</strong>
        </p>
        <p>{{results.description}}</p>
        </div>


    <div class="no-results" v-if="!results">
      <h2>No Words Found</h2>
      <p>Please adjust your search to find more words.</p>
    </div>

    <ul class="errors" v-if="errors && errors.length > 0">
      <li v-for='(error,index) of errors' :key='index'>{{error}}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "News",
  data() {
    return {
      results: null,
      errors: [],
      
    }
  },
    created: function() {
        if (this.$route.params.item){
        this.results=this.$route.params.item;
        console.log(this.results);
        } 
        else {
            this.errors.push('Error go home')
        }
    },

  methods: {
    findNews: function() {
      axios
        .get("https://newsapi.org/v2/top-headlines", { 
          params: { apiKey:'455f31dec2da4cba8d0839a8bb6450d8',
            language: 'en',
            country: this.country
          }
        })
        .then(response => {
          this.results = response.data.articles;
        })
        .catch(error => {
          this.errors.push(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.news {
  font-size: 1rem;
  box-sizing: border-box;
}
input[type="text"]{
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #333;
  width: 300px;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 300;
  background: rgba(0,0,0,0.02);
  padding: 0.5rem;
}
button{
  background: #333;
  padding: 0.5rem;
  font-weight: 300;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
}
h1, h2 {
  font-weight: normal;
}
ul.results {
  list-style-type: none;
  padding: 0;
}
.results li {
  display: inline-block;
  margin: 10px;
  border: solid 1px #333;
  padding: 0.5rem;
  width: 200px;
  height: 300px;
  color: #fff;
  background: rgba(0,0,0,0.7);
}
ul.errors {
  list-style-type: none;
}
.errors li {
  border: 1px solid red;
  color: red;
  padding: 0.5rem;
  margin: 10px 0;
}
a {
  color: #42b983;
}
</style>