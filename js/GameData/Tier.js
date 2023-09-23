addLayer("T", {
  name: "Tier", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
    }
  },
  color: "#FFFFFF",
  requires: new Decimal(100), // Can be a function that takes requirement increases into account
  resource: "Tier", // Name of prestige currency
  baseResource: "Bits", // Name of resource prestige is based on
  baseAmount() { return player.points }, // Get the current amount of baseResource
  type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent() {
    let base = new Decimal(1.5)
    let sc1 = new Decimal(1)
    let sc1s = new Decimal(15)
    sc1s = sc1s.add(hasMilestone("T", "T0-11") ? 3 : 0)
    
    let x = player.T.points
    base = base.sub(hasMilestone("T", "T0-8") ? 0.075 : 0)
    base = base.sub(hasMilestone("T", "T0-9") ? 0.075 : 0)
    base = base.sub(hasMilestone("T", "T0-10") ? 0.075 : 0)
    if (x.gte(15)) {
      sc1 = sc1.add(0.1)
      sc1 = sc1.add(new Decimal.div(x.sub(sc1s), 50))
    }
    let tripow = new Decimal.div(x, 100).add(1).pow(2)
    base = base.pow(tripow)
    base = base.pow(sc1)
    return base
  }, // Prestige currency exponent
  base: 10,
  gainMult() { // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1)
    return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
    return new Decimal(1)
  },
  row: 99, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    { key: "p", description: "P: Reset for prestige points", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
  branches: ["ST"],
  benefitCounter() {
    
  },
  T3bonus1() {
    let base = new Decimal(10)
    let tier = player.T.points
    return new Decimal.pow(base, tier)
  },
  T3bonus2() {
    let base = new Decimal(10)
    let tier = player.T.points
    return new Decimal.pow(base, tier)
  },
  T6bonus() {
    let base = new Decimal(3)
    let tier = player.T.points
    return new Decimal.pow(base, tier)
  },
  T9bonus() {
    let base = new Decimal(1.5)
    let tier = player.T.points
    return new Decimal.pow(base, tier)
  },
  clickables: {
  "doTierReset": {
    display() {
      return `Reset layers below for a Tier, at ${formatNoDecimals(tmp.T.nextAt)} Bits`
    },
    onClick() {
      doReset("T");
      showToast("Tier reset performed...", "toast-success")
    },
    canClick() {
      return player.points.gte(tmp.T.nextAt)
    },
    style() {
      return {
        "width" : "auto",
        "height" : "50px",
        "border": "0px",
        "border-radius": "5px",
        "margin": "20px"
      }
    }
  }
  },
/* holy shit this took too long */
  milestones: {
  "T0-0": createMilestone({
    id: "T0-0",
    reqFn: () => new Decimal(0),
    reqTp: () => "TIER",
    shownFn: () => true,
    doneFn: () => true,
    amountFn: () => 0,
    benefitsFn: () => ["Unlock Stellar layer"],
    ranksFn: () => ["-"],
    effectsFn: () => ["N/A"],
    willToast: true,
    toastMessage: "T0 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-1": createMilestone({
    id: "T0-1",
    reqFn: () => new Decimal(1),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-0"),
    doneFn: () => player.T.points.gte(1),
    amountFn: () => 1,
    benefitsFn: () => ["Unlock 2nd Stellar buyable"],
    ranksFn: () => ["-"],
    effectsFn: () => ["N/A"],
    willToast: true,
    toastMessage: "T1 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-2": createMilestone({
    id: "T0-2",
    reqFn: () => new Decimal(2),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-1"),
    doneFn: () => player.T.points.gte(2),
    amountFn: () => 2,
    benefitsFn: () => ["Unlock 3rd Stellar buyable"],
    ranksFn: () => ["-"],
    effectsFn: () => ["N/A"],
    willToast: true,
    toastMessage: "T2 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-3": createMilestone({
    id: "T0-3",
    reqFn: () => new Decimal(3),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-2"),
    doneFn: () => player.T.points.gte(3),
    amountFn: () => 3,
    benefitsFn: () => ["Unlock 4th Stellar buyable", "Gain 10x ST / Tier"],
    ranksFn: () => ["-", "1"],
    effectsFn: () => ["N/A", `${format(tmp.T.T3bonus1)}x ST`],
    willToast: true,
    toastMessage: "T3 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-4": createMilestone({
    id: "T0-4",
    reqFn: () => new Decimal(4),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-3"),
    doneFn: () => player.T.points.gte(4),
    amountFn: () => 4,
    benefitsFn: () => ["1st Stellar buyable is stronger", "3rd Stellar buyable is stronger", "4th Stellar buyable is stronger"],
    ranksFn: () => ["1", "1", "1"],
    effectsFn: () => ["^1.5 to end calculation", "^1.5 to end calculation", "^1.5 to end calculation"],
    willToast: true,
    toastMessage: "T4 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-5": createMilestone({
    id: "T0-5",
    reqFn: () => new Decimal(5),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-4"),
    doneFn: () => player.T.points.gte(5),
    amountFn: () => 5,
    benefitsFn: () => ["Unlock Ethereum", "Gain more Tokens"],
    ranksFn: () => ["-", "1"],
    effectsFn: () => ["N/A", "2 Tokens / min"],
    willToast: true,
    toastMessage: "T5 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-6": createMilestone({
    id: "T0-6",
    reqFn: () => new Decimal(7),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-5"),
    doneFn: () => player.T.points.gte(7),
    amountFn: () => 6,
    benefitsFn: () => ["1st Stellar buyable is stronger", "4th Stellar buyable is stronger", "Gain 3x Bits / Tier", "Gain more Tokens"],
    ranksFn: () => ["2", "2", "1", "2"],
    effectsFn: () => ["^1.5 to end calculation", `${format(tmp.T.T6bonus)}x Bits`, "4 Tokens / min"],
    willToast: true,
    toastMessage: "T7 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-7": createMilestone({
    id: "T0-7",
    reqFn: () => new Decimal(9),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-6"),
    doneFn: () => player.T.points.gte(9),
    amountFn: () => 7,
    benefitsFn: () => ["2nd Stellar buyable is stronger","Gain 1.5x Ethereum / Tier", "Gain more Tokens"],
    ranksFn: () => ["1","1","3"],
    effectsFn: () => ["^1.5 to end calculation", `${format(tmp.T.T9bonus)}x ETH`, "8 Tokens / min"],
    willToast: true,
    toastMessage: "T9 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-8": createMilestone({
    id: "T0-8",
    reqFn: () => new Decimal(11),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-7"),
    doneFn: () => player.T.points.gte(11),
    amountFn: () => 8,
    benefitsFn: () => ["1st Stellar buyable is stronger", "4th Stellar buyable is stronger", "Gain 10x ST / Tier", "Tier is cheaper"],
    ranksFn: () => ["3", "3", "2", "1"],
    effectsFn: () => ["^1.5 to end calculation", "^1.5 to end calculation", `${format(tmp.T.T3bonus2)}x ST`, "N/A"],
    willToast: true,
    toastMessage: "T11 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-9": createMilestone({
    id: "T0-9",
    reqFn: () => new Decimal(13),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-8"),
    doneFn: () => player.T.points.gte(13),
    amountFn: () => 9,
    benefitsFn: () => ["Tier is cheaper"],
    ranksFn: () => ["2"],
    effectsFn: () => ["N/A"],
    willToast: true,
    toastMessage: "T13 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-10": createMilestone({
    id: "T0-10",
    reqFn: () => new Decimal(15),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-9"),
    doneFn: () => player.T.points.gte(15),
    amountFn: () => 10,
    benefitsFn: () => ["Unlock Stellar Magnitude", "1st Stellar buyable is stronger", "Tier is cheaper"],
    ranksFn: () => ["-", "4", "3"],
    effectsFn: () => ["N/A", "^1.5 to end calculation", "N/A"],
    willToast: true,
    toastMessage: "T15 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-11": createMilestone({
    id: "T0-11",
    reqFn: () => new Decimal(19),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-10"),
    doneFn: () => player.T.points.gte(19),
    amountFn: () => 11,
    benefitsFn: () => ["N/A"],
    ranksFn: () => ["-"],
    effectsFn: () => ["N/A"],
    willToast: true,
    toastMessage: "T19 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
  "T0-12": createMilestone({
    id: "T0-12",
    reqFn: () => new Decimal(23),
    reqTp: () => "TIER",
    shownFn: () => hasMilestone("T", "T0-11"),
    doneFn: () => player.T.points.gte(23),
    amountFn: () => 12,
    benefitsFn: () => ["Make ST Magnitude boost better", "3rd Stellar buyable is stronger", "Unlock SG ★"],
    ranksFn: () => ["1", "4", "-"],
    effectsFn: () => ["log10 > log5", "^1.75 to end calculation", "N/A"],
    willToast: true,
    toastMessage: "T23 milestone achieved!",
    toastType: "toast-notify",
    imgPath: "images/states/notify.png"
  }),
},
  tabFormat: {
  "Main": {
  content: [
    ['raw-html', () => {
      return `  
      <div class="ticker-container">
            <div id="ticker" class="ticker">
            </div>
          </div>`
    }],
    "blank",
    "blank",
  "h-line",
  "blank",
          ['raw-html', () => {
            return `<button onclick='showCustomDialog()' class='alt-tabButton'>Tutorial of T layer</button>
            
          <div id="customDialog" class="custom-dialog">
          <span class='Title-Text-L'>Welcome to Tier layer!</span>
          <br>
          <br>
          <span class='Body-Text-M'>This is #1 soft-prestige layer and you most likely stay here for most of game progression...</span>
          <br>
          <br>
          <span class='Body-Text-XS'>This layer is designed to allow you to unlock new stuff and layers, whatever you can imagine of... Tier resetting will get harder not because gaps get bigger but because Tier reset scale is based on Tri-Power scale ( ( x / 100 + 1 ) ^ 3 to base )</span>
          <br>
          <span class='Body-Text-XS'>Performing a Tier reset will reset anything below it until Bitcoin which is unlocked later ingame. I will gurantee Tier reset is worth always even when gap is too big!<span>
          <br>
          <br>
          <span class='Body-Text-XS'><span style='text-shadow: 0px 0px 10px #ffffff'>ADVANCED INFO</span>: Tier Milestones have stars which will tell you what level or how good is that specific milestone. However you think it as. There are little boxes down which will tell when is improvement and what it will be ( that is if you unlocked it ). Also they aren't Tier based, instead lookout for # values, as they are based on!<span>
          <br>
          <br>
          <button onclick="closeCustomDialog()" class='alt-tabButton'>Close</button>
          </div>`
          }],
  ["row", [['raw-html', () => {
  return `<b class='Main-Text'>You are at Tier <b class='Currency-Text'>${formatNoDecimals(player.T.points)}</b></b>`
  }], ["clickable", "doTierReset"]]],
  ['raw-html', () => {
  return `<b class='Main-Sub-Text'>You have <b class='Currency-Sub-Text'>${format(player.points)}</b> Bits</b>`
  }],
  ['raw-html', () => {
  return `<b class='Main-Sub-Text'>You have unlocked <b class='Currency-Sub-Text'>${formatNoDecimals(player.T.milestones.length)}</b> Tier Milestones  out of <b class='Currency-Sub-Text'>15</b></b>`
  }],
  ['raw-html', () => {
    if (player.T.points.gte(15)) {
    return `<b class='Main-Sub-TextDE'>After T15, Tier scale exponent is raised to the power of <b class='Currency-Sub-TextDE'>^1.1</b> which increases every Tier by <b class='Currency-Sub-TextDE'>0.02</b></b>`
    }
    else return ``
    }],
  "blank",
  "h-line",
  "blank",
  "milestones"
      ]
    }
  }
})