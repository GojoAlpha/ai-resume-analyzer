(function(){
var VERBS="led built created designed developed managed improved increased reduced launched delivered implemented analyzed automated optimized organized established achieved coordinated trained mentored deployed wrote maintained resolved".split(" ");
var STOP="the and for with that this from your you are will have has our can who all not but their they about into more other than such also able work team role job we a an of to in on at as or is be by it its".split(" ");
function has(t,re){return re.test(t)}
function analyze(t){
 var l=t.toLowerCase(),w=t.trim().split(/\s+/).filter(Boolean).length;
 var verbs=VERBS.filter(function(v){return l.indexOf(v)>-1}).length;
 var nums=(t.match(/\d+(\.\d+)?\s?(%|\+|k\b|x\b)|\$\s?\d+/gi)||[]).length;
 return [
  [10,has(t,/[\w.+-]+@[\w-]+\.[\w.]+/),"Email address","Add a professional email at the top."],
  [5,has(t,/(\+?\d[\d\s().-]{8,}\d)/),"Phone number","Add a phone number recruiters can call."],
  [10,has(l,/experience|employment|internship/),"Experience section","Add an Experience or Internships heading."],
  [10,has(l,/education|degree|b\.?tech|b\.?e\b|b\.?sc|university|college/),"Education section","List your degree, college and year."],
  [10,has(l,/skills|technologies|tech stack/),"Skills section","Add a Skills heading with your tools and languages."],
  [10,has(l,/projects?/),"Projects section","Add 2-3 projects with what you built and the result."],
  [15,w>=250&&w<=800,"Length ("+w+" words)",w<250?"Too short. Aim for 250-800 words.":"Too long. Trim to 800 words or fewer."],
  [10,verbs>=5,"Action verbs ("+verbs+" found)","Start bullets with verbs like built, led, improved."],
  [10,nums>=3,"Measurable results ("+nums+" found)","Add numbers: 'cut load time by 40%'."],
  [10,has(l,/linkedin\.com|github\.com/),"LinkedIn or GitHub link","Add a profile link so recruiters can see your work."]
 ];
}
function keywords(j){
 var c={};j.toLowerCase().replace(/[^a-z0-9+#.\s]/g," ").split(/\s+/).forEach(function(x){
  if(x.length>3&&STOP.indexOf(x)<0)c[x]=(c[x]||0)+1});
 return Object.keys(c).sort(function(a,b){return c[b]-c[a]}).slice(0,15);
}
function esc(s){return s.replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}
document.getElementById("go").onclick=function(){
 var t=document.getElementById("r").value,j=document.getElementById("j").value,o=document.getElementById("out");
 o.hidden=false;
 if(t.trim().length<30){o.innerHTML="<p>Paste your resume text first. It needs at least a few lines.</p>";return}
 var cs=analyze(t),s=0;cs.forEach(function(c){if(c[1])s+=c[0]});
 var v=s>=80?"Strong. Polish the details and apply.":s>=55?"Decent. Fix the red items to stand out.":"Needs work. Start with the red items.";
 var h='<div class="score"><span class="num">'+s+'</span><span class="of">/ 100</span></div><div class="meter" aria-hidden="true">';
 for(var i=0;i<10;i++)h+='<i class="'+(s>=(i+1)*10?"on":"")+'"></i>';
 h+='</div><p class="verdict">'+v+'</p><ul>';
 cs.forEach(function(c){h+='<li class="'+(c[1]?"p":"f")+'"><b>'+(c[1]?"✓":"✗")+'</b><div>'+c[2]+(c[1]?"":"<small>"+c[3]+"</small>")+"</div></li>"});
 h+="</ul>";
 if(j.trim().length>20){
  var k=keywords(j),l=t.toLowerCase(),hit=k.filter(function(x){return l.indexOf(x)>-1}),miss=k.filter(function(x){return l.indexOf(x)<0});
  h+="<h2>Job match: "+Math.round(hit.length/k.length*100)+"%</h2>";
  if(miss.length)h+='<p>Missing keywords. Add the ones you truly have:</p><div class="chips">'+miss.map(function(x){return'<span class="miss">'+esc(x)+"</span>"}).join("")+"</div>";
  if(hit.length)h+='<h2>Already covered</h2><div class="chips">'+hit.map(function(x){return'<span class="hit">'+esc(x)+"</span>"}).join("")+"</div>";
 }
 o.innerHTML=h;o.scrollIntoView({behavior:"smooth"});
};
})();
