//  ------- ORIENTAÇÕES ----------
// Os dados são compostos de:
// {
//     "categoria": "nome dado a categoria das perguntas - nome dado ao collapse",
//     daddos: [
//         "colunas": [
//             Cada coluna é um json de informações sobre ela
//             {
//                 "nome": (nome da coluna),
//                 "tipo": (texto, input, radio, slide, radio-junto, radio-separado)
//                 "mostrar": (campo não obrigatório - caso queria que o campo seja escondido colocar "N")
//                 "width": (campo não obrigatório - Tamanho da coluna em porcentagem. EX: "40")
//             }
//         ],
//         "linhas": [
//             Cada linha é um array de informações sobre ela
//             [
//                 Ex: "Qual seu sexo?" (tipo texto), 

//                 Caso o campo seja tipo "input", deve se colocar a linha vazia (""):

//                 Caso o campo seja tipo "radio-junto", deve ter a seguinte estrutura - array:
//                 ["Nunca", "Algumas Vezes", "Sempre"]

//                 Caso o campo seja tipo "slide", deve ter a seguinte estrutura:
//                 {
//                     "min": 0, - valor minimo do slide
//                     "max": 4, - valor "max"imo do slide
//                     inicio: 2, - valor onde o slide deve iniciar (campo não obrigatório)
//                     Legenda - popover que explica a que se refere cada valor - Array de jsons (campo não obrigatório)
//                     "legenda": [
//                         {
//                             "valor": 0,
//                             "titulo": "Nível 0 - Não Aplicável",
//                             "texto": "A completência não se aplica ou não se verifica.",
//                             "cor": "#ee1b24"
//                         },
//                     ]
//                 }
//             ]
//         ]
//     ]
// }

var arrPerguntas = [
    {
        "categoria": "Avaliação de Competência",
        "dados": [
            {
                "colunas": [
                    {
                        "nome": "Competências - Técnicas",
                        "tipo": "texto"
                    },
                    {
                        "nome": "Nivel Requerido",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Auto Avaliação",
                        "tipo": "slide"
                    },
                    {
                        "nome": "Avaliação Cliente",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Avalição Lider Blue",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Avaliação backoffice",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Gap",
                        "tipo": "slide",
                        "mostrar": "N"
                    }
                ],
                "linhas": [
                    [
                        "Capaz de estimar o próprio trabalho em nível de tarefa, planejar e desenvolver o que lhe é solicitado",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Tem profundidade tecnológica, conhece e domina as linguagens, metodologias e tecnologias de sua área de atuação",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        } 
                    ],
                    [
                        "Busca atualizar-se constantemente, seja por conta própria ou através dos treinamentos oferecidos pela empresa",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Apresenta organização e atenção a detalhes",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Demonstra interesse em aprender e aprimorar processos de trabalho",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Cumpre prazos e compromissos assumidos com eficiência na grande maioria das vezes",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Demonstra comprometimento com o trabalho e o cliente",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Demonstra Entendimento do Negócio do cliente e /ou empresa",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ]
                ]
            },
            {
                "colunas": [
                    {
                        "nome": "Competências - Relacionamentos e Comportamental",
                        "tipo": "texto"
                    },
                    {
                        "nome": "Nivel Requerido",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Auto Avaliação",
                        "tipo": "slide"
                    },
                    {
                        "nome": "Avaliação Cliente",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Avalição Lider Blue",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Avaliação backoffice",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Gap",
                        "tipo": "slide",
                        "mostrar": "N"
                    }
                ],               
                "linhas": [
                    [
                        "Constrói parcerias; estabelece bom relacionamento com o grupo; interage com o grupo",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Expressa de maneira clara suas ideias, articula pensamentos precisos; facilidade de expressão",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Raciocínio lógico: estabelece conexões entre dados e apresenta lógica em conclusões objetivas e equilibradas",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Consciência: capacidade para conhecer, reconhecer e avaliar a natureza das próprias ações a fim de eleger o comportamento mais adequado",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Estabilidade emocional: apresenta atitudes maduras e equilibradas diante dos desafios do dia-a-dia. ",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Capacidade de resolver conflitos.",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Capacidade de Transmitir Conhecimento.",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Demonstra capacidade agir sobre pressão.",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Aberto para desafios e novas responsabilidades mesmo que não sejam parte de sua competencia atual. (Requer auto desenvolvimento)",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Flexibilidade e capacidade de se reinventar",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Colaborativo, sempre que possível faz contribuições importantes para o grupo onde está inserido",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Trata todos com educação e empátia sem distinção de cargo e/ou área",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ]
                ]
            },
            {
                "colunas": [
                    {
                        "nome": "Competências - Liderança e Gerencial",
                        "tipo": "texto"
                    },
                    {
                        "nome": "Nivel Requerido",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Auto Avaliação",
                        "tipo": "slide"
                    },
                    {
                        "nome": "Avaliação Cliente",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Avalição Lider Blue",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Avaliação backoffice",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Gap",
                        "tipo": "slide",
                        "mostrar": "N"
                    }
                ],
                "linhas": [
                    [
                        "Apresenta habilidades de coordenação de grupo; liderar equipe de 1,2,3,4+ Recursos; oferece apoio e tem iniciativa na proposição de soluções / mudanças ou ações corretivas",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Busca assegurar o cumprimento do planejado: foco em resultado",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Tem iniciativa e auto direcionamento: decide com responsabilidade",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Habilidade de identificação de novas oportunidades no negócio: visão de novos negócios",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Motiva e cria um ambiente agradável. Dedica atenção às pessoas.",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],
                    [
                        "Capacidade de conduzir reuniões em clientes e no escritório com pares.",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ]
                ]
            },
            {
                "colunas": [
                    {
                        "nome": "Competências Relacionadas a Entrega de Atividades / Projetos",
                        "tipo": "texto"
                    },
                    {
                        "nome": "Nivel Requerido",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Auto Avaliação",
                        "tipo": "slide"
                    },
                    {
                        "nome": "Avaliação Cliente",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Avalição Lider Blue",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Avaliação backoffice",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Gap",
                        "tipo": "slide",
                        "mostrar": "N"
                    }
                ],               
                "linhas": [
                    [
                        "Conta com subsidios de relacionamento e negociação para entregar projetos de Baixa/Media/Alta complexidade",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],                
                    [
                        "Capaz de Liderar tecnicamente projetos",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],                
                    [
                        "Capaz de prover treinamentos e ser mentor de recursos menos qualificados",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],                
                    [
                        "Está sempre atento aos processos internos, entrega no prazo e com qualidade as atividades",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ]             
                ]
            },
            {
                "colunas": [
                    {
                        "nome": "Apresentação Pessoal",
                        "tipo": "texto"
                    },
                    {
                        "nome": "Nivel Requerido",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Auto Avaliação",
                        "tipo": "slide"
                    },
                    {
                        "nome": "Avaliação Cliente",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Avalição Lider Blue",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Avaliação backoffice",
                        "tipo": "slide",
                        "mostrar": "N"
                    },
                    {
                        "nome": "Gap",
                        "tipo": "slide",
                        "mostrar": "N"
                    }
                ],               
                "linhas": [
                    [
                        " Comportamento: Apresenta comportamento e postura adequado para o ambiente profissional, se preocupa com os gestos, olhar, o andar o tom de voz...etc. Sabe distinguir qual o melhor comportamento para cada tipo de ocasião.",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],                
                    [
                        "Aparência: Apresenta-se bem vestido, sempre preparado para situações inesperadas (ex: visita a cliente), veste-se de acordo com o grupo onde está inserido, regras da empresa e responsabilidades.",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ],                
                    [
                        "Ambiente de Trabalho: Mantem o ambiente de trabalho organizado, limpo, arejado, claro e acolhedor.",
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        },
                        {
                            "min": 0,
                            "max": 4,
                            "legenda": [
                                {
                                    "valor": 0,
                                    "titulo": "Nível 0 - Não Aplicável",
                                    "texto": "A completência não se aplica ou não se verifica.",
                                    "cor": "#ee1b24"
                                },
                                
                                {
                                    "valor": 1,
                                    "titulo": "Nível 1 - Básico",
                                    "texto": "Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.",
                                    "cor": "#f3701f"
                                },
                                
                                {
                                    "valor": 2,
                                    "titulo": "Nível 2 - Intermediário",
                                    "texto": "Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.",
                                    "cor": "#fef100"
                                },
                                
                                {
                                    "valor": 3,
                                    "titulo": "Nível 3 - Avancado",
                                    "texto": "Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.",
                                    "cor": "#8ffd09"
                                },
                                
                                {
                                    "valor": 4,
                                    "titulo": "Nível 4 - Referência",
                                    "texto": "Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.",
                                    "cor": "#0093ce"
                                }
                            ]
                        }
                    ]              
                ]
            }
        ]
    },
    {
        "categoria": "Queremos te conhecer melhor",
        "dados": [
            {
                "colunas": [
                    {
                        "nome": "Responda as perguntas abaixo:",
                        "tipo": "texto"
                    },                    
                    {
                        "nome": "",
                        "tipo": "input"
                    }                  
                ],
                "linhas": [
                    ["Nome completo", ""],
                    ["Apelido", ""],
                    ["Data de aniversário", ""],
                    ["Idade", ""],
                    ["Bairro", ""],
                    ["Signo", ""],
                    ["Orientação Sexual", ""],
                    ["Qual a idade dos seus pais?", ""],
                    ["Tem irmãos?", ""],
                    ["Se sim, quantos irmãos?", ""],
                    ["Idades do irmãos?", ""],
                    ["Tem namorada/namorado/Companheiro?", ""],
                    ["Qual a profissão namorada/Namorado/Companheiro/Marido?", ""],
                    ["Tem filhos?", ""],
                    ["Se sim, quantos filhos?", ""],
                    ["Idades dos filhos?", ""],
                    ["Gosto", ""],
                    ["Odeio", ""],
                    ["Manias", ""],
                    ["Música", ""],
                    ["Filme", ""],
                    ["Uma pessoa", ""],
                    ["Sonho", ""],
                    ["Uma frase", ""],
                    ["Uma Viagem", ""],
                    ["Altura", ""],
                    ["Peso", ""],
                ]
            },
            {
                "colunas": [
                    {
                        "nome": "Estado Civil",
                        "tipo": "texto",
                        "width": "50",
                        "mostrarThead": "N"
                    },
                    {
                        "nome": "Solteiro",
                        "tipo": "radio-separado"
                    },
                    {
                        "nome": "Casado",
                        "tipo": "radio-separado"
                    },
                    {
                        "nome": "Outro",
                        "tipo": "radio-separado"
                    }
                ],
                "linhas": [
                    [
                        "Selecione seu estado civil",
                        "Solteiro","Casado", "Outro"	 
                    ]
                ]
            },            
            {
                "colunas": [
                    {
                        "nome": "Tipo",
                        "tipo": "texto",
                        "width": "35",
                    },
                    {
                        "nome": "Tamanho",
                        "tipo": "radio-junto",
                        "width": "40",
                        "classe": "text-left"
                    },
                    {
                        "nome": "Outro",
                        "tipo": "input"
                    }
                ],
                "linhas": [
                    [
                        "Calça",
                        ["P", "M", "G", "GG", "EG", "EXG"],
                        ""
                    ],
                    [
                        "Calça (numeração)",
                        ["38",  "40",  "42",  "44",  "46",  "48",  "50"],
                        ""
                    ],
                    [
                        "Camisa/camiseta/Blusa/Casaco",
                        ["P", "M", "G", "GG", "EG", "EXG"],
                        ""
                    ],
                    [
                        "Camisa/camiseta/Blusa/Casaco (numeração)",
                        ["38",  "40",  "42",  "44",  "46",  "48",  "50"],
                        ""
                    ],
                    [
                        "Vestido",
                        ["P", "M", "G", "GG", "EG", "EXG"],
                        ""
                    ],
                    [
                        "Vestido (numeração)",
                        ["38",  "40",  "42",  "44",  "46",  "48",  "50"],
                        ""
                    ],
                    [
                        "Sapato",
                        ["33", "34", "35","36", "37", "38", "39", "40", "41", "42", "43", "44"],
                        ""
                    ],
                ]
            },  
            {
                "colunas": [
                    {
                        "nome": "Responda as perguntas abaixo:",
                        "tipo": "texto"
                    },                    
                    {
                        "nome": "",
                        "tipo": "input"
                    }                  
                ],
                "linhas": [
                    ["O que gosta de fazer nas horas livres?", ""],
                    ["Quais são seus hobbies?", ""],
                    ["Que serie você assistiria o dia todo?", ""],
                    ["Prefere festas, barzinhos ou ficar em casa?", ""],
                    ["Você gosta mais do dia ou da noite?", ""],
                    ["Prefere praia ou campo?", ""],
                    ["Qual o seu maior medo?", ""],
                    ["Qual sua comida preferida?", ""],
                    ["Qual sua bebida preferida?", ""],
                    ["O que te inspira:", ""],
                    ["É alérgico a algo?", ""],
                    ["Qual o seu maior motivo para sorrir?", ""],
                    ["O que gostaria de fazer que ainda não fez?", ""],
                    ["Uma frustação?", ""],
                    ["Quais são as suas maiores qualidades?", ""],
                    ["Qual a sua maior paixão?", ""],
                    ["Quais os pontos sobre você que acredita que podem ser melhorados?", ""],
                    ["Você participa de alguma causa social?", ""],
                    ["Sua atuação está condizente com sua contratação?", ""],
                    ["Como você avalia a sua atuação?", ""],
                    ["O Que te motiva na empresa?", ""],
                    ["O que te desmotiva na empresa?", ""],
                    ["O que você acha que poderia melhorar sua atuação?", ""],
                    ["Cite três aspectos mais favoráveis da empresa:", ""],
                    ["Cite três aspectos menos favoráveis da empresa:", ""],
                    ["Quais treinamentos já participou dentro da empresa?", ""],
                    ["Quais treinamentos feitos por conta própria?", ""],
                    ["Qual treinamento gostaria de fazer que ainda não fez?", ""],
                    ["Já aconteceu ou presenciou alguma situação na empresa que te incomodou?", ""],
                    ["Que tipo de ação gostaria de ver por parte da empresa?", ""]
                ]
            }
        ]
    }
]