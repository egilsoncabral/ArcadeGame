
const UPPER_LIMIT = 50;
const INFERIOR_LIMIT = 380;
const LEFT_LIMIT = 0;
const RIGHT_LIMIT = 400;

class Component {
    constructor(x, y, sprite) {
      this.x = x;
      this.y = y;
      this.sprite = sprite;
    }
  
  // Desenha na tela o componente
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
  }

// Inimigos que nosso jogador deve evitar
class Enemy extends Component {
    // As variáveis aplicadas a nossas instâncias entram aqui.
    // Fornecemos uma a você para que possa começcar.

    // A imagem/sprite de nossos inimigos, isso usa um
    // ajudante que é fornecido para carregar imagens
    // com facilidade.
    constructor (x, y, speed, player, sprite) {
        super(x,y,sprite);
        this.speed = speed;
        this.player = player;
    }
    // Atualize a posição do inimigo, método exigido pelo jogo
    // Parâmetro: dt, um delta de tempo entre ticks
    update (dt) {
    // Você deve multiplicar qualquer movimento pelo parâmetro
    // dt, o que garantirá que o jogo rode na mesma velocidade
    // em qualquer computador.
      this.x = this.x + this.speed * dt;
      //bug width = 100px height = 80px
      //player width = 80px height = 90
      //verify collisions
      if(this.player.x + 70> this.x && this.player.x < this.x + 100 && this.player.y + 85 > this.y && this.player.y < this.y + 60){
        this.player.hasCollided = true;
      }
    };
    
};



// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().
class Player extends Component{
    constructor(x, y, sprite){
        super(x, y, sprite)
        this.hasCollided = false;
    }
    update(){
        if (this.hasCollided) {
            this.x = 200;
            this.y = 380;  
            this.hasCollided = false; 
        }
    }
        
    handleInput(value){
        switch(value){
          case('up'):
            if (this.y >= UPPER_LIMIT) {
                this.y = this.y - 84;  
            } else{
                this.y = -40;
            }
            break;
          case('down'):
            if (this.y < INFERIOR_LIMIT) {
                this.y = this.y + 84;   
            }else{
                this.y = INFERIOR_LIMIT;
            }
            break;
          case('left'):
            if (this.x > LEFT_LIMIT) {
                this.x = this.x - 100;
            } else{
                this.x = LEFT_LIMIT;
            }
            break;
          case('right'):
            if (this.x < RIGHT_LIMIT) {
                this.x = this.x + 100;      
            }else{
                this.x = RIGHT_LIMIT
            }
            break;
        }
    }
};


// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.
const enemySpawnLineY = [60, 140, 220];
var allEnemies = new Set();
var player = new Player(200, 380, 'images/char-boy.png');
setInterval(addEnemies, 1500);

//create 4 initial enemies so the screen will not begin empty
for(i = 0; i < 4; i++){
    allEnemies.add(new Enemy(Math.random()*420, enemySpawnLineY[Math.floor(Math.random()*4)], Math.random()*100+30, player, 'images/enemy-bug.png'));
}

// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//add elements to the screen
function addEnemies() {
    allEnemies.add(new Enemy(-100, enemySpawnLineY[Math.floor(Math.random()*3)], Math.random()*100+30, player, 'images/enemy-bug.png'));
}
