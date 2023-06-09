function LogicaReport(){

    this.getProjetos = function(data){
      let projetos = data.reduce((acumulador, elemento) => {
        acumulador[elemento.Project] = ( acumulador[elemento.Project] || 0) + 1;
        return acumulador} , [])
      return projetos;
    }

    this.maiorFrequenciaCliente = function(data){
      let clientes = data.reduce((acumulador, elemento) => {
        acumulador[elemento.Client] = ( acumulador[elemento.Client] || 0) + 1;
        return acumulador} , [])

      let acc = 0;
      let valor = '';
      for(let i in clientes){
        if(clientes[i] > acc){
          acc = clientes[i];
          valor = i;
        }
      }
        return {nome: valor, somatorio: acc};
    }

    this.getProjetosNomes = function(projetos){
      let datas = [];
      for(let i in projetos){
        datas.push(i);
      }
      return datas;
    }
    
    this.maiorFrequenciaProjeto = function (data){
      let projetos = logicaReport.getProjetos(data);
      let acc = 0;
      let valor = '';
      for(let i in projetos){
        if(projetos[i] > acc){
          acc = projetos[i];
          valor = i;
        }
      }
        return {nome: valor, somatorio: acc};
    }
    
    this.gerarDataset = function(data, projetos){
      let datas = {};
      let countElse = 0;
      projetos = logicaReport.getProjetosNomes(projetos);
      for(let x = 0; x < projetos.length; x++){
        datas[x] = new Array;
        for(let i = 0; i < data.length; i++){
          countElse = 0;
          countIf = 0;
           if(data[i] instanceof Array ){
            for(let z in data[i]){
              if(data[i][z].Project === projetos[x]){
                if(countElse){
                  datas[x].pop();
                  countElse = 0;
                }
                datas[x].push(data[i][z].duracao_minutos);
                countIf = true;
                break;
              } else{
                countElse++;
                if(countElse>1){
                  continue;
                } else{
                  datas[x].push(0);
                }
              }
            }
          } else{
            datas[x].push(0);
          }
          

        }
      }
      let dataset = [];
      let background_color = [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(201, 203, 207, 0.8)'
        ]
      
      for(let i in datas){
        dataset.push({
          label: projetos[i],
          barPercentage: 1,
          backgroundColor: background_color[i],
          maxBarThickness: 80,
          data: datas[i]
        })
      }
      return dataset;
    }

} 

let logicaReport = new LogicaReport();