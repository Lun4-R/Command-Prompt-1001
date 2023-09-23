// I have no fucking idea what those really are but they are needed to make certain notations work

function powExp(n, exp) { // dilate
  if (n.lt(10)) return n
  return Decimal.pow(10, n.log10().pow(exp))
}

function powExp2(n, exp) { // Trilate
  if (n.lt(1e10)) return n
  return Decimal.pow(10, Decimal.pow(10, n.log10().log10().pow(exp)))
}

function powExp3(n, exp) { // Tetralate
  if (n.lt(Decimal.pow(10, 1e10))) return n
  return Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, n.log10().log10().log10().pow(exp))))
}

function powExpN(num, n, exp) { // n-late
  num = new Decimal(num)
  exp = new Decimal(exp)
  if (num.lt(tet10(n))) return num
  return slogadd(slogadd(num, -n).pow(exp), n)
}

function mulSlog(n, mul) {
  if (n.lt(10)) return n
  return tet10(slog(n).mul(mul))
}

function powSlog(n, exp) {
  if (n.lt(10)) return n
  return tet10(slog(n).pow(exp))
}

function powSlogExp(n, exp) {
  if (n.lt(10)) return n
  return tet10(powExp(slog(n), exp))
}

function slog(n) {
  n = new Decimal(n)
  return Decimal.add(n.layer, new Decimal(n.mag).slog())
}

function slogadd(n, add) {
  n = new Decimal(n)
  return Decimal.tetrate(10, slog(n).add(add))
}

function tet10(n) {
  n = new Decimal(n)
  return Decimal.tetrate(10, n)
}

// ************ Big Feature related ************
function getTimesRequired(chance, r1) {
  chance = new Decimal(chance)
  if (chance.gte(1)) return 1
  if (chance.lte(0)) return Infinity
  if (r1 == undefined) r1 = Math.random()
  //we want (1-chance)^n < r1
  let n
  if (chance.log10().gt(-5)) {
    n = Decimal.ln(r1).div(Math.log(1 - chance))
  } else {
    n = Decimal.ln(1 / r1).div(chance)
  }
  //log(1-chance) of r2
  return n.floor().add(1)
}

function bulkRoll(chance, ms, r1) {
  chance = new Decimal(chance)
  if (r1 == undefined) r1 = Math.random()
  let n = 1 - ((1 - r1) ** (50 / ms))
  let c = Decimal.log(n, 1 / Math.E).div(chance)
  return c.floor()
}

function recurse(func, startingValue, times) {
  if (times <= 0) return startingValue
  return recurse(func, func(startingValue), times - 1)
}

//Tree of life
function getLogisticTimeConstant(current, gain, loss) {
  if (current.eq(gain.div(loss))) return Infinity
  if (current.gt(gain.div(loss))) return current.times(loss).sub(gain).ln().div(-1).div(loss)
  return current.times(loss).sub(gain).times(-1).ln().div(-1).div(loss)
}

function logisticTimeUntil(goal, current, gain, loss) {
  if (current.gte(goal)) return formatTime(0)
  if (goal.gte(gain.div(loss))) return formatTime(1 / 0)
  // we have current < goal < gain/loss
  val1 = goal.times(loss) //Bx
  val2 = gain.sub(val1) //A-Bx
  val3 = val2.ln() //ln(A-Bx)
  val4 = val3.times(-1).div(loss) //LHS

  c = getLogisticTimeConstant(current, gain, loss)
  return formatTime(val4.sub(c))
}

function getLogisticAmount(current, gain, loss, diff) {
  if (loss.eq(0)) return current.add(gain.mul(diff))
  if (current.eq(gain.div(loss))) return current
  if (gain.gte("ee10") || loss.gte(1e308)) return gain.div(loss)
  if (current.lt(gain.div(loss))) {
    c = getLogisticTimeConstant(current, gain, loss)

    val1 = c.plus(diff) // t+c
    val2 = val1.times(-1).times(loss) // -B(t+c)
    val3 = Decimal.exp(val2) // this should be A-Bx
    val4 = gain.sub(val3) // should be A-(A-Bx) = Bx
    val5 = val4.div(loss) // should be x

    return val5.max(0)
  } else {
    c = getLogisticTimeConstant(current, gain, loss)

    val1 = c.plus(diff) // t+c
    val2 = val1.times(-1).times(loss) // -B(t+c)
    val3 = Decimal.exp(val2) // this should be Bx-A
    val4 = gain.plus(val3) // should be (Bx-A)+A
    val5 = val4.div(loss) // should be x

    return val5.max(0)
  }
}

function showCustomDialog() {
  document.getElementById('customDialog').style.display = 'block';

  // Get all elements with class 'custom-dialog' and loop through them
  const customDialogs = document.getElementsByClassName('custom-dialog');
  for (let i = 0; i < customDialogs.length; i++) {
    customDialogs[i].classList.add('appear');
  }
}

function closeCustomDialog() {
  document.getElementById('customDialog').style.display = 'none';

  // Get all elements with class 'custom-dialog' and loop through them
  const customDialogs = document.getElementsByClassName('custom-dialog');
  for (let i = 0; i < customDialogs.length; i++) {
    customDialogs[i].classList.remove('appear');
  }
}

function tooltip(btn, text) {
  const tooltipElement = createTooltip();
  tooltipElement.textContent = text;

  // Append the tooltip to the body or another container
  document.body.appendChild(tooltipElement);

  // Position the tooltip relative to the button
  const buttonRect = btn.getBoundingClientRect();
  tooltipElement.style.top = buttonRect.bottom + "px";
  tooltipElement.style.left = buttonRect.left + "px";

  // Show the tooltip
  tooltipElement.style.opacity = 1;

  // Hide the tooltip after a delay (e.g., 2 seconds)
  setTimeout(function() {
    tooltipElement.style.opacity = 0;
    setTimeout(function() {
      tooltipElement.remove(); // Remove the tooltip from the DOM
    }, 300); // Adjust the delay as needed
  }, 2000); // Adjust the delay as needed
}


// Function to create a tooltip element
function createTooltip() {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip-text";
  tooltip.style.opacity = 0; // Start hidden
  return tooltip;
}

function lineBreak(count) {
  let lineBreaks = "";
  for (let i = 0; i < count; i++) {
    lineBreaks += "<br>";
  }
  return lineBreaks;
}

var newsItems = [
  {
    type: "text",
    content: "Breaking News: News were broken =("
    },
  {
    type: "gif",
    content: "gifs/gif1.gif",
    style: "max-width: 8px; max-height: 8px;"
    },
  {
    type: "text",
    content: "The Bluetooth device, is ready to pair"
    },
  {
    type: "text",
    content: "This news ticker will be certified place where all of shitpost happens"
    },
  {
    type: "text",
    content: "It is so sad that Steve Jobs died of Ligma..."
    },
  {
    type: "text",
    content: "No, no-no no no no no no. Wait wait wait wait wait. WAIT WAIT WAIT WAIT WAIT!!!"
    },
  {
    type: "text",
    content: "QBits are believed to be able to be 0 and 1 at same time due to something called supposition"
    },
  {
    type: "text",
    content: "Day 1 of playing with my sticky balls"
    },
  {
    type: "text",
    content: "Full of cocaine"
    },
  {
    type: "text",
    content: "His name is Shithead and he is single-celled organism..."
    },
  {
    type: "text",
    content: "You should LOVE YOURSELF NOW!"
    },
  {
    type: "text",
    content: "#relateable"
    },
  {
    type: "text",
    content: "Day 2 of playing with my sticky balls, I feel like a ninja now"
    },
  {
    type: "text",
    content: "I play with my ballls when I am bored"
    },
  {
    type: "text",
    content: "Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room full of rats. And rats make me crazy."
    },
  {
    type: "text",
    content: `"This is the endgame of ${VERSION.withoutName}, there is no point of going further." Guy named Dos:`
    },
  {
    type: "text",
    content: `i wanna be an astronaut" -some guy running the mexican radio`
    },
  {
    type: "text",
    content: `"Me when my wife is asking from me, why am I taking carbon monoxide detector from ceiling at 3am`
    },
  {
    type: "text",
    content: `"This is the endgame of ${VERSION.withoutName}, there is no point of going further." Guy named Dos:`
    },
  {
    type: "text",
    content: `Thank you SlaXoriuZ!!!`
    },
  {
    type: "text",
    content: `Says it has infinite games, but only has 12. This is a scam`
    },
  {
    type: "text",
    content: `200 hours of gameplay and I still haven't unlocked fabled "Funny Dong Zone". What am I doing wrong?`
    },
  {
    type: "text",
    content: `Thank you Dosrandom3!!!`
    },
  {
    type: "text",
    content: `Thank you Robominer5!!!`
    },
  {
    type: "text",
    content: `"Houston, we have a problem. How many computers do we have?" "I'm afraid, more than atoms in universe, sir..."`
  },
  {
    type: "text",
    content: `Help what's the code string, I don't understand the clue`
    },
  {
    type: "text",
    content: `Run that back!`
    },
  {
    type: "text",
    content: `h`
    },
  {
    type: "text",
    content: `My best advice: Don't...`
    },
  {
    type: "text",
    content: `We have done too much trolling`
  },
  {
    type: "text",
    content: `I rather act silly sometimes`
    },
  {
    type: "text",
    content: `Universe expansion is accelerating and I don't know why`
    },
  {
    type: "text",
    content: `Something malicious is brewing...`
    },
  {
    type: "text",
    content: `Stay hydrated! This is a threat`
    },
  {
    type: "text",
    content: `Around the world`
  },
  {
    type: "text",
    content: `Fuck you whoever is named Jermiah`
    },
  {
    type: "text",
    content: `Welcome to Antim- whoops, wrong game again. I should just stay in Universal Paperclips.`
    },
  {
    type: "text",
    content: `Why did the chicken not cross the road? To look at the stellar view!`
    },
  {
    type: "text",
    content: `🌈🍆👍  😠 🎄😠⛔️🎄🍆☢️`
    },
  {
    type: "text",
    content: `Oh you are The Stellar Lumen enjoyer? Name every sub version...`
  },
  {
    type: "text",
    content: `Roll that foward!`
    },
  {
    type: "text",
    content: `This cat is just j`
    },
  {
    type: "text",
    content: `This cat is just h`
    },
  {
    type: "text",
    content: `Prank him John!`
    },
  {
    type: "text",
    content: `To my blind followers: 👋🤚🤟✌️👌🤌👉👍🖐`
    },
  {
    type: "text",
    content: `I LOVE CATS!!!`
    },
  {
    type: "text",
    content: `^w^`
    },
  {
    type: "text",
    content: `21st century humor`
    },
  {
    type: "text",
    content: `I will find you...`
    },
  {
    type: "text",
    content: `Click here to receive 4 Bitcoins ( punjabi free , no virus )`
    },
  {
    type: "text",
    content: `Fax my brother! Spit your shit indeed!`
    },
  {
    type: "text",
    content: `lmao what`
    },
  {
    type: "text",
    content: `This news ticker might contain dark humor , lot of swearing , unfunny gifs and memes and nerdy facts. Viewer's discretion is advised...`
    },
  {
    type: "text",
    content: `Me when table of elements, doesn't contain element of suprise`
    },
  {
    type: "text",
    content: `Begin Gay is okay 🏳️‍🌈🏳️‍⚧️🇩🇪`
    },
  {
    type: "text",
    content: `Where is my infinite bacon, BUT NO GAMES?!??`
    },
  {
    type: "text",
    content: `type: "text"`
    },
  {
    type: "text",
    content: `Staff cat :3`
    },
  {
    type: "text",
    content: `Roadblocks`
    },
  {
    type: "text",
    content: `Warcrimes are legal, if you do them digitally you know`
    },
  {
    type: "text",
    content: `I am going to commit great crime. I am going to bust nut`
    },
  {
    type: "text",
    content: `You said you are going to follow me anywhere, but your eyes told md you won't be there...`
    },
  {
    type: "text",
    content: `Get doxxed, I know where you live ➡️🌍`
    },
  {
    type: "text",
    content: `Adrenaline is pumping...`
    },
  {
    type: "text",
    content: `But here is the driver`
    },
  {
    type: "text",
    content: `But here is the walker`
    },
  {
    type: "text",
    content: `But here is the eeper`
    },
  {
    type: "text",
    content: `False advertisement`
    },
  {
    type: "text",
    content: `Quantum immortality`
    },
  {
    type: "text",
    content: `THE ONE PIECE IS REAL!!!`
    },
  {
    type: "text",
    content: `Don't worry, if the PLAN A fails. There is still 25 letters left in alphabet`
    },
  {
    type: "text",
    content: `This news ticker is sponsored by Raid Shadow Lengends...`
  },
  {
    type: "text",
    content: `I just gotta ruhhhh. My poor heart can not took that... Foak yuou...`
    },
  {
    type: "text",
    content: `MyHouse.wad`
    },
  {
    type: "text",
    content: `This news ticker RNG sucks so much ass, because 35 tickers out of 13 had todo something with balls`
  },
  {
    type: "text",
    content: `${VERSION.withoutName} is fake news!`
    },
];

function getRandomItem() {
  return newsItems[Math.floor(Math.random() * newsItems.length)];
}

function updateTicker() {
  const tickerElement = document.getElementById("ticker");
  const randomItem = getRandomItem();

  if (randomItem.type === "text") {
    tickerElement.textContent = randomItem.content;
  } else if (randomItem.type === "image") {
    const imageElement = document.createElement("img");
    imageElement.src = randomItem.content;
    tickerElement.innerHTML = "";
    tickerElement.appendChild(imageElement);
  } else if (randomItem.type === "gif") {
    const gifElement = document.createElement("img");
    gifElement.src = randomItem.content;
    tickerElement.innerHTML = "";
    tickerElement.appendChild(gifElement);
  }
}

function bits() {
  const thing = new Decimal(player.points)
  const newsItem = {
    type: "text",
    content: `If every bit you had here was a size of single bit, you literally would have ${thing} Bits`
  };
  newsItems.push(newsItem);
}

function renderNewsItem(newsItem) {
  let itemElement;

  if (newsItem.type === "text") {
    itemElement = document.createElement("div");
    itemElement.textContent = newsItem.content;
  } else if (newsItem.type === "image" || newsItem.type === "gif") {
    itemElement = document.createElement("img");
    itemElement.src = newsItem.content;
    if (newsItem.style) {
      itemElement.setAttribute("style", newsItem.style);
    }
  }

  return itemElement;
}



setInterval(updateTicker, 3000);

function showToast(message, state, imagePath) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast", state, "show-toast");
  const flexContainer = document.createElement("div");
  flexContainer.classList.add("flex-container");

  const image = document.createElement("img");
  image.src = imagePath;
  image.alt = "Icon";
  image.style.maxWidth = "24px";
  image.style.maxHeight = "24px";

  const textSpan = document.createElement("span");
  textSpan.textContent = message;
  textSpan.style.display = "flex";
  textSpan.style.alignItems = "center";


  flexContainer.appendChild(image);
  flexContainer.appendChild(textSpan);
  toast.appendChild(flexContainer);
  toastContainer.appendChild(toast);
  toast.offsetWidth;


  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2700);
  toast.addEventListener("transitionend", () => {
    toast.remove();
  });
}


function createMilestone({
  id,
  reqFn,
  reqTp,
  shownFn,
  doneFn,
  amountFn,
  benefitsFn,
  ranksFn,
  effectsFn,
  willToast = false,
  toastMessage = "Milestone achieved!",
  toastType = "success",
  imgPath = ""
}) {
  return {
    id: id,
    done() {
      return doneFn();
    },
    req() {
      return reqFn();
    },
    type() {
      return reqTp();
    },
    amount() {
      return amountFn();
    },
    unlocked() {
      return shownFn();
    },
    effectDescription() {
      const benefitList = benefitsFn().map((benefit) => `<span>[+] ${benefit}</span>`).join('<br>');
      const effectList = effectsFn().map((effect) => `<span>${effect}</span>`).join('<br>');
      const rankList = ranksFn().map((rank) => `<span>${rank}</span>`).join('<br>');
      return `
        <span class='Milestone-Title'>${this.type()} ${formatNoDecimals(this.req())}</span>
        <div class='Star-Container'>
          <span id='S1'>★</span>
        </div>
        <span class='Milestone-SubUT'>UNLOCKS</span>
        <div class='Milestone-BenefitC'>
          ${benefitList}
        </div>
        <span class='Milestone-SubRT'>RANK</span> 
        <div class='Milestone-RankC'>
          ${rankList}
        </div>
        <span class='Milestone-SubET'>EFFECTS</span>
        <div class='Milestone-EffectC'>
          ${effectList}
        </div>
        <span class='Milestone-Amount'>#${formatNoDecimals(this.amount())}</span>
        ${lineBreak(16)}
      `;
    },
    style() {
      const commonStyle = {
        background: "linear-gradient(to top, #272727 50%, #222 50%)",
        "background-size": "50%",
        width: "1000px",
        height: "auto",
        padding: "5px",
        "border-radius": "2px",
        margin: "5px",
        color: this.done() ? "#ffffff" : "#000000",
      };
      if (this.unlocked()) {
        return {
          ...commonStyle,
          border: "1px solid #ffffff",
          "box-shadow": "0px 0px 6px rgba(255,255,255,0.5)",
          "transition-duration": "2s",
        };
      }
      return commonStyle;
    },
    onComplete() {
      if (willToast && this.unlocked()) {
        showToast(toastMessage, toastType, imgPath);
      }
    },
  };
}

// b ^ ( f × x )
var doubleGeometric = (base, factor, iterations) => {
  return Decimal.pow(base, Decimal.mul(factor, iterations));
};

function doubleGeometricMax(Currency, Base, Growth, Factor) {
  let maxQuantity = new Decimal(1.78e308);
  let totalCost = new Decimal(0);
  let x = new Decimal(0);
  let low = new Decimal(0);
  let high = new Decimal(1.78e308); 

  while (high.minus(low).gte(1e-6)) {
    const mid = low.plus(high).div(2);
    const currentCost = Decimal.pow(Base, Decimal.pow(Growth, Factor.mul(mid))).sub(1).div(Base.sub(1));
    if (Currency.gte(totalCost.plus(currentCost))) {
      maxQuantity = mid;
      totalCost = totalCost.plus(currentCost);
      low = mid;
    } else {
      high = mid;
    }
    x = x.add(1);
  }
  
  return {
    maxQuantity,
    totalCost
  };
}



const triGeometrical = (n, base, factor1, factor2, k = 1) => {
  return Decimal.mul(base, Decimal.mul(factor1.pow(n).sub(factor2.pow(n)), k));
};

var exponential = (base, factor, iterations) => {
  return Decimal.pow(base, iterations);
};


var doubleExponential = (base, factor, iterations) => {
  return Decimal.pow(base, Decimal.pow(factor, iterations));
};

const triExponential = (n, base1, base2, factor, k = 1) => {
  return Decimal.mul(base1.pow(n).add(base2.pow(n)), k);
};

document.addEventListener("DOMContentLoaded", function() {
  function loadScript() {
    const totalScripts = 20; // Total number of scripts to load
    let loadedScripts = 0;

    function scriptLoaded() {
      loadedScripts++;
      const progress = (loadedScripts / totalScripts) * 100;
      const progressBar = document.getElementById("progress");
      progressBar.style.width = `${progress}%`;
      if (loadedScripts === totalScripts) {
        document.getElementById("loading-container").style.display = "none";
      }
    }

    for (let i = 0; i < totalScripts; i++) {
      setTimeout(scriptLoaded, Math.random() * 4000); 
    }
  }
  window.addEventListener("load", loadScript);
});







let Base = new Decimal(70)
let Growth = new Decimal(3)
let Currency = new Decimal("1eeeee15")
let Max = Decimal.affordGeometricSeries(Currency, Base, Growth)
let Cost = Decimal.sumGeometricSeries(Max, Base, Growth)
console.log(`IGNORE THIS: You can buy a maximum of ${Max} iterations.`);
let h = new Decimal(2)
h = h.fromMantissaExponent_noNormalize(10, 1.25)
console.log(h)