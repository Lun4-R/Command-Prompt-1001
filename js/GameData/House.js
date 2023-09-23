addLayer("HS", {
  layerShown() { return true },
  row: "side",
  posistion: 2,
  symbol() {
    return `<img src='images/layers/House_512x.png' height='60' width='60'>`
  },
  startData() {
    return {
      unlocked: true,
      inAction: false,
      steps: new Decimal(0),
      actionType: `doing nothing`,
      actionTimer: new Decimal(0),
      textOutput: ``,
      tickRate: new Decimal(1)
    }
  },
  textUpdate() {
    let text = `Search for Keys?`
    if (player[this.layer].steps.gte(1)) text = `Go into house?`
    if (player[this.layer].steps.gte(2)) text = `Look around?`
    if (player[this.layer].steps.gte(3)) text = `Look around?`
    return text
  },
  textUpdateSub() {
    let text = ``
    if (player[this.layer].steps.gte(1)) text = `I found my Keys`
    if (player[this.layer].steps.gte(2)) text = `I went into my house. It's dark...`
    if (player[this.layer].steps.gte(3)) text = `After turning a nearby light switch on I encountered 3 rooms...`
    return text
  },
  clickables: {
    "DoAction1": {
      display() {
        var state = tmp.HS.textUpdate
        return `
        <div class='Buyable-Style'>
        <span class='Body-Text-M'>${state}</span>
        <br>
        </div>`
      },
      canClick() {
        return player.HS.inAction === false
      },
      onClick() {
      return player[this.layer].steps = player[this.layer].steps.add(1)
      },
      style() {
        return {
          "margin": "5px",
          "width": "auto",
          "height": "auto",
          "border-radius": "0px",
          "border": "0px",
          "color": "#000000",
          "posistion": "absolute"
        }
      }
    },
    "DoAction2": {
      display() {
        return `
        <div class='Buyable-Style'>
        <span class='Body-Text-M'>Go back to Street</span>
        <br>
        </div>`
      },
      canClick() {
        return player.HS.inAction === false
      },
      onClick() {
        return player[this.layer].steps = new Decimal(0)
      },
      style() {
        return {
          "margin": "5px",
          "width": "auto",
          "height": "auto",
          "border-radius": "0px",
          "border": "0px",
          "color": "#000000",
          "posistion": "absolute"
        }
      }
    },
    unlocked() {
     if (player[this.layer].steps.gte(1)) {
       return true
     }
      else return false
    }
  },
  tabFormat: {
    "Streets": {
      content: [
          ['raw-html', () => {
          return `
            <div class='container'>
            <span class='StoryText'>You are standing in the middle of some street. It's dark outside and rather cold. In front of you is a house. You might want to search for your house keys.</span>
            <br>
            <br>
            </div>`
          }],
          ["row", [["clickable", "DoAction1"], ["clickable", "DoAction2"]]],
          ['raw-html', () => {
            return `
            <div class='container'>
            <span class='StoryText'>${tmp.HS.textUpdateSub}</span>
            <br>
            <br>
            </div>`
            }]
          ]
    },
  }
})