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
        } else {
            quadrados[i] = this.state.p1IsNext ? pedra_v() : pedra_a()
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