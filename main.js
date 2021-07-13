//AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token']='bearertokenrightherefam'

// AXIOS INSTANCES
const axiosInstance=axios.create({
  baseURL:'https://jsonplaceholder.typicode.com/'
})

axiosInstance.get('todos',{params:{_limit:5},timeout:5000})
.then(res=>showOutput(res))
.catch(err=>console.log(err))

// GET REQUEST
function getTodos() {
  console.log('GET Request');
  
  // axios({
  //   method:'get',
  //   url:'https://jsonplaceholder.typicode.com/todos'
  // }).then(response=>showOutput(response))
  //   .catch(error=>console.log(error));

  // axios.get('https://jsonplaceholder.typicode.com/todos')
  //       .then(res=>showOutput(res))
  //       .catch(err=>console.log(err))

  axios.get('https://jsonplaceholder.typicode.com/todos',{params:{_limit:5}})
        .then(res=>showOutput(res))
        .catch(err=>console.log(err))
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  
  // axios({
  //   method:'post',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   data:{
  //     title:'New Todo',
  //     completed:false,
  //   }
  // }).then(response=>showOutput(response))
  //   .catch(error=>console.log(error));

  axios.post('https://jsonplaceholder.typicode.com/todos',
    {
      title:'New Todo',
      completed:false,
    }
  ).then(response=>showOutput(response))
    .catch(error=>console.log(error));
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request');
  
  axios.patch('https://jsonplaceholder.typicode.com/todos/1',
  {
    title:'Updated todo',
    completed:true
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))

}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');

  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');

  //Takes in two get requests and then outputs the response
  // axios.all(
  //   [
  //     axios.get('https://jsonplaceholder.typicode.com/todos'),
  //     axios.get('https://jsonplaceholder.typicode.com/posts')
  //   ]
  // )
  // .then(res=>{
  //   console.log(res[0])
  //   console.log([1])
  // })
  // .catch(err=>console.log(err))

  axios.all(
    [
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ]
  )
  .then(axios.spread(
    (todos,posts)=>{
      console.log(todos)
      showOutput(posts)
    }
    ))
  .catch(err=>console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');

  const config={
    headers:{
      'Content-Type':'application/json',
      'Authorization':'sometoken'
    }
  };

  axios.post('https://jsonplaceholder.typicode.com/todos',
  {
    title:'New Todo',
    completed:false,
  }
  ,config
  ).then(response=>showOutput(response))
    .catch(error=>console.log(error));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');

  const options={
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos',
    data:{
      title:'Hello world'
    },
    transformResponse:axios.defaults.transformResponse.concat(
      data=>{
        data.title=data.title.toUpperCase()
        return data;
      }
    )
  }

  axios(options).then(res=>showOutput(res)).catch(err=>console.log(err))
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');

  axios.get('https://jsonplaceholder.typicode.com/todoss',{params:{_limit:5}})
        .then(res=>showOutput(res))
        .catch(err=>{
          if(err.response.status>400){
            alert('Error: Something went wrong')
          }
        })
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');

}

// INTERCEPTING REQUESTS & RESPONSES



// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
