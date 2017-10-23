function collect(c){
  return document.querySelector(c).textContent
}
window.collect = collect;

window.Collector = {
  collect:function(c){
    return document.querySelector(c).textContent
  }
};

//window.Collector = Collector;
