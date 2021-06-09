import React from 'react'
import ReactDOM from 'react-dom'
import titulo from './img/titulo.png'
import vs from './img/vs.png'
import avatar_f from './img/avatar-feminino.png'
import avatar_pc from './img/avatar_pc.png'
import restart from './img/restart.png'
import './index.css'

function Quadrado(props) {
    return(
        <button
            className="quadrado"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function pedra_v(){
    return(
        <div className="pedra_vermelha">
        </div>
    );
}

function pedra_a(){
    return(
        <div className="pedra_amarela">
        </div>
    );
}

class Tabuleiro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quadrados: Array(19**2).fill(null),
            p1IsNext: true,
        };
    }

    colocarPedra(i) {
        const quadrados = this.state.quadrados.slice();
        const centro = parseInt(quadrados.length/2)
        if (quadrados[i]) {
            return;
        }
        if (!quadrados[centro]) {
            quadrados[centro] = this.state.p1IsNext ? pedra_v() : pedra_a()
            //GameStart();
        } else {
            quadrados[i] = this.state.p1IsNext ? pedra_v() : pedra_a()
           // alert((this.state.quadrados[i-1] === pedra_v()) ? 1 : 2);
           //alert(this.state.quadrados[i-1].props.className)
           //verificarPedras(quadrados[i-1]);
            verificarPedras(quadrados, i);
            //console.log(quadrados[i]);
        }
        this.setState({
            quadrados: quadrados,
            p1IsNext: !this.state.p1IsNext,
        });

    }

    renderTabuleiro(n) {
        const tabuleiro = []
        for (let i = 0; i < n; i++){
            for (let j = 0; j < n; j++){
                tabuleiro.push(<Quadrado
                                    value={this.state.quadrados[(n*i)+j]}
                                    onClick={() => this.colocarPedra((n*i)+j)}
                                />);
             }
             tabuleiro.push(<div> </div>);
        }

        return (
           <div className="tabuleiro">
                {tabuleiro}
           </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderTabuleiro(19)}
            </div>
        );
    }
}

function GameStart() {
    alert("Inicio do Game!")
}

function GameRestart() {
    alert("Reiniciar o Game!")
}

class Jogo extends React.Component {
    render() {
        return(
            <div className="jogo" style={{marginTop: 15}}>
                <div className="jogo-tabuleiro">
                    <Tabuleiro />
                </div>
            </div>
        );
    }
}

class Menu extends React.Component{
    render() {
        return(
            <nav id="menu">
                <div className="menu_title">Nome</div>
                <div id="form">
                    <input id="player_name" type="name" style={{textAlign: "center"}} placeholder="Insira seu nickname"/>
                </div>

                <div className="menu_title">Avatar</div>
                    <div id="check" className="menu_subtitle">
                            <input id="marculino" type="checkbox"/> &nbsp;&nbsp;&nbsp;Masculino&nbsp;&nbsp;&nbsp;&nbsp;
                            <input id="feminino" type="checkbox"/> &nbsp;&nbsp;&nbsp;Feminino
                    </div>

                <div className="menu_title">Cor</div>
                    <div id="check" style={{display: "-webkit-box", marginTop: 10}}>
                        <input type="checkbox" style={{marginTop: "auto", verticalAlign: "middle"}}/>
                        <div className="pedra_vermelha" style={{marginLeft: 15}}></div>
                    </div>
                    <div id="check" style={{display: "-webkit-box", marginTop: 10}}>
                        <input type="checkbox" style={{marginTop: "auto", verticalAlign: "middle"}}/>
                        <div className="pedra_amarela" style={{marginLeft: 15}}></div>
                    </div>

                <div className="menu_title">Início</div>
                    <div id="check" className="menu_subtitle">
                        <input id="marculino" type="checkbox"/> &nbsp;&nbsp;&nbsp;Player
                    </div>
                    <div id="check" className="menu_subtitle">
                        <input id="feminino" type="checkbox"/> &nbsp;&nbsp;&nbsp;PC
                    </div>

                <div id="start" style={{textAlign: "center"}}>
                    <button type="submit" onClick={GameStart}>Jogar</button>
                </div>

                <div style={{display: "flex", placeContent: "center", marginTop: 15}}>
                    <img src={restart} alt="restart" style={{width: '13%', height: '13%'}} onClick={GameRestart}/>
                    <div className="restart">&nbsp;&nbsp;Restart</div>
                </div>

                <div className="resultado">
                    <div>Vitórias:</div>
                    <div>Derrotas:</div>
                </div>
            </nav>
        );
    }
}

class Interface extends React.Component {
    render() {
        return(
            <div className="background_effect">
                <img src={titulo} className="position-logo" alt="titulo" />
                <div id="limit"> 
                    <div id="corpo">
                        <Menu />
                        <section id="fundo_area_jogo">
                            <article className="area_jogo">
                                    <div className="ctnFlex">
                                        <div className="cabecalho_area_jogo" style={{marginLeft: 30}}>
                                            <div className="fundo_avatar" style={{marginTop: -5, marginLeft: -5}}>
                                                <div className="circle" style={{float: "left"}}>
                                                    <img src={avatar_f} alt="avatar_f"/>
                                                </div>
                                            </div>
                                        </div>
                                        <img src={vs} alt="vs" style={{width: '8%', height: '8%', marginTop: "auto"}}/>
                                        <div className="cabecalho_area_jogo" style={{marginRight: 30}}>
                                            <div className="fundo_avatar" style={{float: "right", marginTop: -5, marginRight: -5}}>
                                                <div className="circle" style={{float: "right"}}>
                                                    <img src={avatar_pc} alt="avatar_pc"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Jogo />
                                    </div>
                            </article>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

// ==============================================================================

ReactDOM.render(
    <Interface />,
    document.getElementById('root')
);

var parV = 0;
var parA = 0;

function verificarPedras(pedras, posicao) {
    const limiteEsq = Array(19)
    const limiteDir = Array(19)
    var linha;
    var contadorDC = 0;
    var contadorDD = 0;
    var contadorH = 0;
    var contadorV = 0;
    var contadorDC2 = 0;
    var contadorDD2 = 0;
    var contadorH2 = 0;
    var contadorV2 = 0;
    const vertical = Array(9)
    const horizontal = Array(9)
    const diagonalD = Array(9)
    const diagonalC = Array(9)

    //Criando os valaores dos limites laterais (borda do tabuleiro)
    for (let i = 0; i < 19; i++) {
        let nomePedra = pedras[posicao].props.className
        limiteEsq[i] = i*19;
        limiteDir[i] = (i*19) + 18;

        //Checando a linha no tabuleiro
        if (posicao >= limiteEsq[i] && posicao <= limiteDir[i]) {
            linha = i;
            
            let DiagEsq = (posicao - limiteEsq[i]) > 3 ? 4 : (posicao - limiteEsq[i])
            let DiagDir = (limiteDir[i] - posicao) > 3 ? 4 : (limiteDir[i] - posicao)
            let vert = (i > 3 && i < 15) ? 4 : (18-i)
            let horizE = (DiagEsq <= 8 &&  DiagEsq > 3) ? 4 : DiagEsq
            let horizD = (DiagDir >= 8 &&  DiagDir < 15) ? 4 : DiagDir
            let horiz = horizE > 3 ? horizE : horizD

            //Armazena a sequencia de pedras
            for (let k = 0; k < 5; k++) {
                //diagonal crescente
                let pedraAtualE = pedras[posicao - ((DiagDir - k)*18)]
                let pedraAtualD = pedras[posicao + k*18]

                if (pedraAtualE != null) {
                    diagonalC[k] = pedraAtualE.props.className
                } 
                if (pedraAtualD != null) {
                    diagonalC[DiagDir+k] = pedraAtualD.props.className
                } 

                //diagonal decrescente
                let pedraAtualE2 = pedras[posicao - ((DiagEsq - k)*20)]
                let pedraAtualD2 = pedras[posicao + k*20]

                if (pedraAtualE2 != null) {
                    diagonalD[k] = pedraAtualE2.props.className
                } 
                if (pedraAtualD2 != null) {
                    diagonalD[DiagEsq+k] = pedraAtualD2.props.className
                }

                //vertical
                let pedraAtualEV = pedras[posicao - ((vert - k)*19)]
                let pedraAtualDV = pedras[posicao + k*19]

                if (pedraAtualEV != null) {
                    vertical[k] = pedraAtualEV.props.className
                } 
                if (pedraAtualDV != null) {
                    vertical[vert+k] = pedraAtualDV.props.className
                } 

                //horizontal
                let pedraAtualEH = pedras[posicao - (horiz - k)]
                let pedraAtualDH = pedras[posicao + k]

                if (pedraAtualEH != null) {
                    horizontal[k] = pedraAtualEH.props.className
                } 
                if (pedraAtualDH != null) {
                    horizontal[horiz+k] = pedraAtualDH.props.className
                }  
            }
            

            //Verifica a sequencias de pedras
            for (let k = 0; k < 9; k++) {
                //Verifica a diagonal crescente
                if (diagonalC[k] != null) {
                    if (diagonalC[k] === nomePedra) {
                        if (contadorDC2 === 2) {
                            
                            if (nomePedra === "pedra_vermelha") {
                                parV += 1
                            } else {
                                parA += 1
                            }

                            alert("Par - " + parV + parA)
                            
                        }

                        contadorDC += 1;
                        contadorDC2 = 0
                        console.log("DC: " + contadorDC)  

                    } else if (contadorDC >= 1){
                        contadorDC2 += 1                        
                    } else {
                        contadorDC = 0;
                        contadorDC2 = 0;
                    } 


                    if (contadorDC === 5) {
                        alert("Vitoria DC" + contadorDC); 
                    } else if (parV === 5 || parA === 5) {
                        alert("Vitoria Par - " + parV + parA); 
                    }

                } else {
                    contadorDC = 0;
                    contadorDC2 = 0;
                } 


                //Verifica a diagonal decrescente
                if (diagonalD[k] != null) {
                    if (diagonalD[k] === nomePedra) {
                        if (contadorDD2 === 2) {  
                            if (nomePedra === "pedra_vermelha") {
                                parV += 1
                            } else {
                                parA += 1
                            }

                            alert("Par - " + parV + parA)   
                        }

                        contadorDD += 1;
                        contadorDD2 = 0;
                        console.log("DD: " +contadorDD)  
                    }  else if (contadorDD >= 1){
                        contadorDD2 += 1                        
                    } else {
                        contadorDD = 0;
                        contadorDD2 = 0;
                    }

                    if (contadorDD === 5) {
                        alert("Vitoria DD" + contadorDD); 
                    } else if (parV === 5 || parA === 5) {
                        alert("Vitoria Par - " + parV + parA); 
                    }
                } else {
                    contadorDD = 0;
                    contadorDD2 = 0;
                } 


                //Verifica horizontal
                if (horizontal[k] != null) {
                    if (horizontal[k] === nomePedra) {
                        if (contadorH2 === 2) {  
                            if (nomePedra === "pedra_vermelha") {
                                parV += 1
                            } else {
                                parA += 1
                            }

                            alert("Par - " + parV + parA)   
                        }

                        contadorH += 1;
                        contadorH2 = 0;
                        console.log("H: " +contadorH)  
                    } else if (contadorH >= 1){
                        contadorH2 += 1                        
                    } else {
                        contadorH = 0;
                        contadorH2 = 0;
                    }

                    if (contadorH === 5) {
                        alert("Vitoria H" + contadorH); 
                    } else if (parV === 5 || parA === 5) {
                        alert("Vitoria Par - " + parV + parA); 
                    }
                } else {
                    contadorH = 0;
                    contadorH2 = 0;
                }


                //Verifica vertical
                if (vertical[k] != null) {
                    if (vertical[k] === nomePedra) {
                        if (contadorV2 === 2) {  
                            if (nomePedra === "pedra_vermelha") {
                                parV += 1
                            } else {
                                parA += 1
                            }

                            alert("Par - " + parV + parA)   
                        }
                        contadorV += 1;
                        contadorV2 = 0;
                        console.log("V: " +contadorV)  
                    } else if (contadorV >= 1){
                        contadorV2 += 1                        
                    } else {
                        contadorV = 0;
                        contadorV2 = 0;
                    }

                    if (contadorV === 5) {
                        alert("Vitoria V" + contadorV); 
                    } else if (parV === 5 || parA === 5) {
                        alert("Vitoria Par - " + parV + parA); 
                    }
                } else {
                    contadorV = 0;
                    contadorV2 = 0;
                }
            }
        }
    }
}