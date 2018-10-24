class Animation {
  constructor(options) {
    this.props = {};

    for (const [key, value] of Object.entries(options)) {
      this.props[key] = value;
    }

    this.state = {
      speed: this.props.speed,
      phase: 0,
      addBugs: false,
      speedUp: false,
      flyingProjectiles: 1,
      guyFrame: 0,
      colorCounter: 0,
      kaomojiCounter: 0,
      sparklesAnimation: null,
      kaomojiAnimation: null,
      sparklesSpans: [],
      sparklesQueue: [],
    }

    this.initializingClick = this.initialize.bind(this);
    this.props.container.addEventListener('click', this.initializingClick);
  }

  initialize() {
    const { state, props } = this;
    if (state.playing) {
      return;
    } else {
      state.playing = true;

      // google analytics
      gtag('event', 'animationStart');
    }

    // create spans
    props.sparklesSpans = [...props.sparkles].map(sparkle => {
      const span = document.createElement('span');
      span.textContent = sparkle;
      span.style.color = this.nextColor();
      return span;
    });
    props.sparklesElement.innerHTML = '';
    props.sparklesSpans.forEach(sparkle => {
      props.sparklesElement.appendChild(sparkle);
    });

    // create animation intervals
    state.sparklesAnimation = setInterval(this.animateSparkles.bind(this), this.state.speed);
    state.kaomojiAnimation = setInterval(this.animateKaomoji.bind(this), this.state.speed);

    // create click listener
    props.container.removeEventListener('click', this.initializingClick);
    props.container.addEventListener('click', () => {
      state.speedUp = true;
    });
  }

  animateSparkles() {
    const { props, state } = this;

    const sparkle = props.sparklesElement.lastChild;
    props.sparklesElement.removeChild(sparkle);
    sparkle.style.color = this.nextColor();

    if (props.projectiles.indexOf(sparkle.textContent) == -1) {
      state.sparklesQueue.push(sparkle);
    } else {
      state.flyingProjectiles--;
    }

    if (state.flyingProjectiles < props.maxProjectiles && (this.getRandomInt(100) + 1) <= (props.projectilesChance * 100)) {
      state.flyingProjectiles++;
      const span = document.createElement('span');
      span.textContent = this.randomProjectile();
      span.style.color = this.nextColor();
      state.sparklesQueue.push(span);
    }

    const nextSparkle = state.sparklesQueue.shift();
    if (nextSparkle) {
      props.sparklesElement.insertBefore(nextSparkle, props.sparklesElement.firstChild);
    }

    if (!state.addBugs && state.phase == 2) {
      state.addBugs = true;
      props.projectiles.push(...props.bugs);
    }

    if (state.speedUp) {
      state.speedUp = false;
      state.speed *= props.increment;
      clearInterval(state.sparklesAnimation);
      state.sparklesAnimation = setInterval(this.animateSparkles.bind(this), state.speed);
    }
  }

  animateKaomoji() {
    if (this.state.phase == 3) {
      this.flipTable();
      return;
    }

    const { kaomojiElement, kaomoji } = this.props;
    const { speed, kaomojiCounter, phase } = this.state;

    kaomojiElement.textContent = kaomoji[phase][kaomojiCounter];
    this.state.kaomojiCounter++;

    if (kaomojiCounter >= kaomoji[0].length - 1) {
      this.state.kaomojiCounter = 0;
    }

    if (this.state.speedUp) {
      clearInterval(this.state.kaomojiAnimation);
      this.state.kaomojiAnimation = setInterval(this.animateKaomoji.bind(this), speed);
    }

    this.checkPhase();
  }

  flipTable() {
    clearInterval(this.state.sparklesAnimation);
    clearInterval(this.state.kaomojiAnimation);

    // animate out remaining sparkles
    setInterval(() => {
      const remainingSparkles = [...this.props.sparklesElement.textContent];
      remainingSparkles.pop();
      remainingSparkles.unshift(' ');
      this.props.sparklesElement.textContent = remainingSparkles.join('');
    }, this.state.speed);

    // flip the table
    setTimeout(() => {
      this.props.kaomojiElement.textContent = '( ノO‿O)ノ';
      const laptop = document.querySelector('.laptop');
      const laptopTop = document.querySelector('.laptop-top');
      laptopTop.textContent = '    ______';
      laptop.textContent = '彡彡/___/';
    }, 1500);
  }

  nextColor() {
    if (this.state.colorCounter < 0) {
      this.state.colorCounter = this.props.colors.length - 1;
    }

    const color = this.props.colors[this.state.colorCounter];
    this.state.colorCounter -= 1;

    return color;
  }

  randomProjectile() {
    const { projectiles } = this.props;
    return projectiles[this.getRandomInt(projectiles.length)];
  }

  checkPhase() {
    const { speed } = this.state;
    const { speedPhases } = this.props;

    if (speed < speedPhases[this.state.phase]) {
      this.state.phase += 1;
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

function createEmailAnchor(element, array) {
  const email = array.join('');
  element.href = 'mailto:' + email + '?subject=Reaching Out';
  element.innerHTML = email;
}

const options = {
  container: document.querySelector('.animation'),
  sparklesElement: document.querySelector('.sparkles'),
  kaomojiElement: document.querySelector('.guy'),
  sparkles: '-.･ﾟ*｡-･ﾟ☆',
  projectiles: ['☆','☃', '⚾︎', '✏︎', '✪', '✿', '✂', '☕'],
  bugs: ['🐛', '🐛', '🐛', '🐛', '👾', '👻', '💀', '💩'],
  maxProjectiles: 3,
  projectilesChance: .20,
  kaomoji: [
    ['( ⊃・ω・)੭', '( ੭・ω・)⊃'],
    ['( ⊃ •̀ω•́)੭', '( ੭ •̀ω•́)⊃'],
    ['( ⊃ ○Д○)੭', '( ੭ ○Д○)⊃'],
  ],
  speed: 300,
  speedPhases: [100, 40, 20],
  increment: .92,
  colors: [
    '#d50000',
    '#C51162',
    '#AA00FF',
    '#6200EA',
    '#304FFE',
    '#2962FF',
    '#0091EA',
    '#00B8D4',
    '#00BFA5',
    '#00C853',
    '#64DD17',
    '#AEEA00',
    '#FFD600',
    '#FFAB00',
    '#FF6D00',
    '#DD2C00',
  ],
}

// const animation = new Animation(options);
const email = document.querySelector('#email');
createEmailAnchor(email, ['jefferson','w','lam','@','gmail','.','com']);
