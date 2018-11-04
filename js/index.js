function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + document.getElementById('username').value + '/repos');
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  let repoList = '<ul>';
  for (var i = 0; i < repos.length; i++) {
    repoList += '<li><a href="' + repos[i]['html_url'] + '">' + repos[i]['name'] + '</a> <a href="#" data-url="' + repos[i]['url'] + '" onclick="getCommits(this)">Commits</a></li>';
  }
  repoList += '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  console.log('worked');
  let url = el.dataset.url;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', url + '/commits');
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  console.log(commits);
  let commitList = '';
  for (var i = 0; i < commits.length; i++) {
    commitList += '<ul><li>' + commits[i]['sha'] + '</li><li>' + commits[i]['commit']['author']['name'] + '</li><li>' + commits[i]['commit']['message'] + '</li></ul>';
  }
  document.getElementById('details').innerHTML = commitList;
}
