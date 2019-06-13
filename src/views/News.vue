<template>
  <div class="news">
    <h2>News</h2>
  <form v-on:submit.prevent="findNews">
      <p>
        Enter country
        <input type="text" v-model="country" placeholder="Try the US">
        <button type="submit">Search</button>
      </p>
    </form>
    <ul class="results" v-if="results && results.length > 0">
      <li class="item" v-for="(item,index) of results" :key='index'>
        <p>
          <strong>{{item.title}}</strong>
        </p>
        <p><router-link :to="{name:'info', params: {id:item}}">More Info</router-link>
        <button v-on:click="moreInfo(item)">More</button>
        </p>
      </li>
    </ul>
    <div class="no-results" v-else-if="results && results.length==0">
      <h2>News Not Found</h2>
      <p>Please adjust your search.</p>
    </div>

    <ul class="errors" v-if="errors && errors.length > 0">
      <li v-for='(error,index) of errors' :key='index'>{{error.message}}</li>
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
      country: ''
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
    },
    moreInfo: function(item) {
        console.log (item)
        this.$router.push({ name: 'info', params: { item } })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news {
  font-size: 1rem;
  box-sizing: border-box;
  background-color: cornsilk;
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
