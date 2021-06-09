import React from 'react'
import ReactDOM from 'react-dom'
import titulo from './img/titulo.png'
import vs from './img/vs.png'
import avatar_f from './img/avatar-feminino.png'
import avatar_pc from './img/avatar_pc.png'
import restart from './img/restart.png'
import './index.css'

function Quadrado_centro(props) {
    return(
        <button
            className="quadrado_centro"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function Quadrado_sup_esq(props) {
    return(
        <button
            className="quadrado_sup_esq"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function Quadrado_sup_dir(props) {
    return(
        <button
            className="quadrado_sup_dir"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function Quadrado_inf_esq(props) {
    return(
        <button
            className="quadrado_inf_esq"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function Quadrado_inf_dir(props) {
    return(
        <button
            className="quadrado_inf_dir"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function Quadrado_lateral_esq(props) {
    return(
        <button
            className="quadrado_lateral_esq"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function Quadrado_lateral_dir(props) {
    return(
        <button
            className="quadrado_lateral_dir"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function Quadrado_sup(props) {
    return(
        <button
            className="quadrado_sup"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function Quadrado_inf(props) {
    return(
        <button
            className="quadrado_inf"
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
                if (j==0 & i==0){
                    tabuleiro.push(<Quadrado_sup_esq
                        value={this.state.quadrados[(n*i)+j]}
                        onClick={() => this.colocarPedra((n*i)+j)}
                    />);
                }
                else if (j==18 & i==0){
                    tabuleiro.push(<Quadrado_sup_dir
                        value={this.state.quadrados[(n*i)+j]}
                        onClick={() => this.colocarPedra((n*i)+j)}
                    />);
                }
                else if (j==0 & i==18){
                    tabuleiro.push(<Quadrado_inf_esq
                        value={this.state.quadrados[(n*i)+j]}
                        onClick={() => this.colocarPedra((n*i)+j)}
                    />);
                }
                else if (j==18 & i==18){
                    tabuleiro.push(<Quadrado_inf_dir
                        value={this.state.quadrados[(n*i)+j]}
                        onClick={() => this.colocarPedra((n*i)+j)}
                    />);
                }
                else if (i==0){
                    tabuleiro.push(<Quadrado_sup
                        value={this.state.quadrados[(n*i)+j]}
                        onClick={() => this.colocarPedra((n*i)+j)}
                    />);
                }
                else if (i==18){
                    tabuleiro.push(<Quadrado_inf
                        value={this.state.quadrados[(n*i)+j]}
                        onClick={() => this.colocarPedra((n*i)+j)}
                    />);
                }
                else if (j==0){
                    tabuleiro.push(<Quadrado_lateral_esq
                        value={this.state.quadrados[(n*i)+j]}
                        onClick={() => this.colocarPedra((n*i)+j)}
                    />);
                }
                else if (j==18){
                    tabuleiro.push(<Quadrado_lateral_dir
                        value={this.state.quadrados[(n*i)+j]}
                        onClick={() => this.colocarPedra((n*i)+j)}
                    />);
                }
                else{
                    tabuleiro.push(<Quadrado_centro
                        value={this.state.quadrados[(n*i)+j]}
                        onClick={() => this.colocarPedra((n*i)+j)}
                    />);
                }
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
                <div className="menu_title">Nomes</div>
                <div id="form">
                    <div className="menu_subtitle" style={{marginLeft: 30}}>Player 1:
                        <input id="player_name" type="name" style={{textAlign: "center"}} placeholder="Insira seu nickname"/>
                    </div>
                    <div className="menu_subtitle" style={{marginLeft: 30}}>Player 2:
                        <input id="player_name" type="name" style={{textAlign: "center"}} placeholder="Insira seu nickname"/>
                    </div>
                </div>

                <div className="menu_title">Avatar</div>
                    <div id="check" className="menu_subtitle">
                            <div style={{marginLeft: 30}}>Player 1:
                            <input id="marculino" type="checkbox"/> &nbsp;&nbsp;M&nbsp;&nbsp;
                            <input id="feminino" type="checkbox"/> &nbsp;&nbsp;F
                            </div>
                    </div>
                    <div id="check" className="menu_subtitle">
                            <div style={{marginLeft: 30}}>Player 2:
                            <input id="marculino" type="checkbox"/> &nbsp;&nbsp;M&nbsp;&nbsp;
                            <input id="feminino" type="checkbox"/> &nbsp;&nbsp;F
                            </div>
                    </div>

                <div className="menu_title">Início</div>
                    <div id="check" className="menu_subtitle">
                        <input id="marculino" type="checkbox"/> &nbsp;&nbsp;&nbsp;Player 1&nbsp;&nbsp;&nbsp;&nbsp;
                        <input id="feminino" type="checkbox"/> &nbsp;&nbsp;&nbsp;Player 2
                    </div>

                <div className="menu_title">Cor de início</div>
                    <div id="check" style={{display: "-webkit-box", marginTop: 10}}>
                        <input type="checkbox" style={{marginTop: "auto", verticalAlign: "middle"}}/>
                        <div className="pedra_vermelha" style={{marginLeft: 15}}></div>
                    </div>
                    <div id="check" style={{display: "-webkit-box", marginTop: 10}}>
                        <input type="checkbox" style={{marginTop: "auto", verticalAlign: "middle"}}/>
                        <div className="pedra_amarela" style={{marginLeft: 15}}></div>
                    </div>

                <div id="start" style={{textAlign: "center"}}>
                    <button type="submit" onClick={GameStart}>Jogar</button>
                </div>

                <div style={{display: "flex", placeContent: "center", alignItems: "center", marginTop: 15}}>
                    <img src={restart} alt="restart" style={{width: '12%', height: '12%'}} onClick={GameRestart}/>
                    <div className="restart">&nbsp;&nbsp;Restart</div>
                </div>

                <div className="resultado">
                    <div>Vitórias P1:</div>
                    <div>Vitórias P2:</div>
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