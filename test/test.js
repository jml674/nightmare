this.jsdom = require('jsdom-global')()
global.$ = global.jQuery = require('jquery');
var Nightmare = require('nightmare')
var silentTest = false;
var expect = require('chai').expect // jshint ignore:line
var m = require('mocha-generators').install()
//console.log("m=",m);
 var tests = [
              {url: 'https://www.github.com',gotologin:'a[href="/login"]',
                 u:'#login_field',uc:"jml674",
                 p:'#password',pc:"gerard0000",
                 s:'input[type="submit"]',
                 c:'.select-menu.account-switcher span',regexp:/jml674/},
              /*{url: 'https://www.mediapart.fr',gotologin:'li.connexion a',
                 u:'#edit-name-page',uc:"jean-michel.lambert7@wanadoo.fr",
                 p:'#edit-pass-page',pc:"gerard",
                 s:'input[name="op"]',
                 c:'.success',regexp:/Vous .tes . pr.sent identifi.-e sur Mediapart./}
              */
              ];
 tests.forEach((test, index) =>{
    describe('test login '+test.url, function() {
      this.timeout(50000);
      
      it('should find success login message at the end', async function(){
          var nightmare = Nightmare({
            show:!silentTest,gotoTimeout: 50000 
          })
          try{
            var result = await nightmare
            .goto(test.url)
            .wait(test.gotologin)
            .click(test.gotologin)
            .insert(test.u, test.uc)
            .insert(test.p, test.pc)
            .click(test.s)
            //.wait(3000)
            .wait(test.c)
            .inject("js","custom-script.js")
            .end()
            .evaluate((test)=>{ 
                return {successString:Collector.collect(test.c)};
            },test)
            .catch(e=>{
              console.log("ExCEPTION1",e);
            });
            expect(result.successString).to.match(test.regexp)
            //done();
            nightmare.end()
            return result;
          }
          catch(e){
            console.log("ExCEPTION2",e);
            //done(e);
          }
      })
    });
});

