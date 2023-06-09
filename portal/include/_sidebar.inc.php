<?php
$usuarioSessao = $do->getUserSession();
$usuarioCodigo = $usuarioSessao['codigo'];
?>


<div class="wrapper">
  <!-- Sidebar  -->
  <nav id="sidebar" class="">
    <div class="side-button">
      <svg id="seta-branca" xmlns="http://www.w3.org/2000/svg" width="7.876" height="13.777" viewBox="0 0 7.876 13.777">
        <g id="icon-arrow" transform="translate(7.876) rotate(90)">
          <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back"
            d="M5.5,6.887.289,1.678A.985.985,0,1,1,1.684.288l5.906,5.9a.983.983,0,0,1,.029,1.358L1.688,13.49A.985.985,0,0,1,.293,12.1Z"
            transform="translate(13.777) rotate(90)" fill="#fff" />
        </g>
      </svg>
    </div>
    <div class="sidebar-content h-100">
      <img class="img-fluid logo-sidebar m-auto d-flex justify-content-center align-items-center" width="150"
        src="<?php echo HTTP_SERVER; ?>portal/img/sidebar/Logo.svg">
      <ul class="list-unstyled components" id="menu-sidebar">
        <li id="home" class="active menus">
          <a href="javascript:void(0)" onclick="link('home.php?menu=home')" class="btnSidebar active">
            <div class="item-content">
              <div class="item-media">
                <svg xmlns="http://www.w3.org/2000/svg" width="15.422" height="13.991" viewBox="0 0 15.422 13.991">
                  <path id="Icon_metro-home" data-name="Icon metro-home"
                    d="M17.992,11.287,10.282,5.3,2.571,11.287V8.847l7.711-5.985,7.711,5.985Zm-1.928-.218v5.783H12.209V13H8.354v3.855H4.5V11.07l5.783-4.337Z"
                    transform="translate(-2.571 -2.861)" fill="#fff" />
                </svg>

              </div>
              <div class="item-inner">
                <span class="title">Home</span>
              </div>
            </div>
          </a>
        </li>
       

        <?php
        if ($usuarioSessao['clt'] == 'N') {
          ?>
          <li id="projetos" class="menus">
            <a href="javascript:void(0)" onclick="link('anexarNota/public/')" class="btnSidebar">
              <div class="w-100 d-flex align-items-center">
                <svg id="Camada_2" data-name="Camada 2" xmlns="http://www.w3.org/2000/svg" width="19.638" height="23.067"
                  viewBox="0 0 19.638 23.067">
                  <g id="Camada_1" data-name="Camada 1">
                    <path id="Path_77230" data-name="Path 77230"
                      d="M6.539,23.047a5.3,5.3,0,0,1-.868-.207,6.72,6.72,0,0,1-1.335-.668,25.173,25.173,0,0,1-2-1.6,4.508,4.508,0,0,1-.583-6.351q2.822-3.538,5.659-7.063A3.383,3.383,0,0,1,12.343,6.6,3.947,3.947,0,0,1,13.8,8.44a3.2,3.2,0,0,1-.445,3.082c-1.01,1.335-2.078,2.621-3.115,3.93-.378.474-.75.957-1.142,1.42a1.253,1.253,0,1,1-1.934-1.593c.465-.59.937-1.173,1.406-1.758l2.619-3.276a.924.924,0,0,0-.174-1.486L10.8,8.576a.914.914,0,0,0-1.442.167l-1.435,1.78L3.744,15.734a2.015,2.015,0,0,0-.312,2.274,1.932,1.932,0,0,0,.474.619c.61.521,1.224,1.044,1.876,1.509a2,2,0,0,0,2.857-.445l7.108-8.872c.3-.376.608-.745.9-1.126a2.023,2.023,0,0,0-.316-2.94q-2.343-1.9-4.709-3.783a2.023,2.023,0,0,0-2.98.381Q6.172,6.437,3.7,9.53c-.478.6-.95,1.2-1.438,1.791A1.246,1.246,0,0,1,.086,11a1.239,1.239,0,0,1,.24-1.264L1.761,7.941q2.43-3.031,4.856-6.064A4.673,4.673,0,0,1,9.082.162a4.415,4.415,0,0,1,4.07.83q2.408,1.9,4.78,3.83a4.538,4.538,0,0,1,.67,6.44q-3.981,4.974-7.967,9.947a4.6,4.6,0,0,1-3.115,1.78,1.045,1.045,0,0,0-.129.038Z"
                      transform="translate(-0.007 0.021)" fill="#a5b5bb" />
                  </g>
                </svg>
                <span class="fonte-menu">Anexar Nota</span>
              </div>
            </a>
          </li>
          <?php
        }
        ?>

        <?php
        if ($usuarioSessao['clt'] == 'N') {
          ?>
          <li id="projetos" class="menus">
            <a href="javascript:void(0)" onclick="link('notasFiscais/public/')"
              class="btnSidebar">
              <div class="w-100 d-flex align-items-center">
                <svg id="Camada_2" data-name="Camada 2" xmlns="http://www.w3.org/2000/svg" width="15.422" height="19.968"
                  viewBox="0 0 15.422 19.968">
                  <g id="Camada_1" data-name="Camada 1" transform="translate(0 0)">
                    <path id="Path_77229" data-name="Path 77229"
                      d="M0,10.251V1.472A1.36,1.36,0,0,1,.989.063,1.759,1.759,0,0,1,1.473,0H13.939a1.365,1.365,0,0,1,1.473,1.473c0,5.89,0,11.759.011,17.639a.717.717,0,0,1-1.113.675c-.286-.177-.61-.3-.9-.465a.478.478,0,0,0-.513,0c-.33.181-.669.339-1.006.507a1.155,1.155,0,0,1-1.1,0c-.36-.183-.717-.372-1.085-.534a.482.482,0,0,0-.351,0c-.349.154-.688.328-1.027.507a1.229,1.229,0,0,1-1.216,0c-.32-.168-.648-.318-.963-.492a.465.465,0,0,0-.494,0c-.33.179-.671.337-1,.507a1.161,1.161,0,0,1-1.119,0c-.36-.185-.717-.372-1.085-.536a.454.454,0,0,0-.332,0,9.134,9.134,0,0,0-1.01.515A.711.711,0,0,1,0,19.124C.019,16.166,0,13.208,0,10.251ZM8.162,3.807c0-.221.011-.421,0-.631a.452.452,0,1,0-.9,0,4.72,4.72,0,0,0,0,.488.182.182,0,0,1-.154.21,2.354,2.354,0,0,0-1.168.658A1.584,1.584,0,0,0,6.09,6.958a3.423,3.423,0,0,0,.728.421c.45.21.919.366,1.372.564a2.674,2.674,0,0,1,.6.345.677.677,0,0,1,.08,1.031,1.4,1.4,0,0,1-.753.45,2.278,2.278,0,0,1-1.893-.438.458.458,0,0,0-.69.074.468.468,0,0,0,.181.673,3.692,3.692,0,0,0,1.548.631c0,.21,0,.389,0,.581a.456.456,0,1,0,.911,0v-.421c0-.137.021-.185.16-.21a2.325,2.325,0,0,0,1.092-.585,1.611,1.611,0,0,0-.172-2.56A3.787,3.787,0,0,0,8.6,7.152c-.389-.17-.791-.309-1.178-.48a4.026,4.026,0,0,1-.732-.381.7.7,0,0,1-.065-1.159,1.527,1.527,0,0,1,.911-.421A2.409,2.409,0,0,1,9.22,5.2a.456.456,0,0,0,.667-.067.467.467,0,0,0-.162-.677,3.65,3.65,0,0,0-1.563-.646ZM7.708,14.98H4.249a1.249,1.249,0,0,0-.295.027.444.444,0,0,0,0,.858,1.25,1.25,0,0,0,.295.027h7.068a.456.456,0,1,0,0-.911h-.189Zm.017-1.809H4.182a.482.482,0,0,0-.507.271c-.145.324.095.631.492.631h7.089a.484.484,0,0,0,.465-.236.451.451,0,0,0-.452-.669C10.1,13.168,8.907,13.173,7.724,13.17Z"
                      transform="translate(0 0)" fill="#a5b5bb" />
                  </g>
                </svg>

                <span class="fonte-menu">Notas Fiscais</span>
              </div>
            </a>
          </li>
        <?php } ?>

        <?php
      if ($usuarioSessao['clt'] == 'S') {
          ?>
          <li id="projetos" class="menus">
            <a href="javascript:void(0)" onclick="link('holerite/public/')"
              class="btnSidebar">
              <div class="w-100 d-flex align-items-center">
                <svg id="Camada_2" data-name="Camada 2" xmlns="http://www.w3.org/2000/svg" width="15.422" height="19.968"
                  viewBox="0 0 15.422 19.968">
                  <g id="Camada_1" data-name="Camada 1" transform="translate(0 0)">
                    <path id="Path_77229" data-name="Path 77229"
                      d="M0,10.251V1.472A1.36,1.36,0,0,1,.989.063,1.759,1.759,0,0,1,1.473,0H13.939a1.365,1.365,0,0,1,1.473,1.473c0,5.89,0,11.759.011,17.639a.717.717,0,0,1-1.113.675c-.286-.177-.61-.3-.9-.465a.478.478,0,0,0-.513,0c-.33.181-.669.339-1.006.507a1.155,1.155,0,0,1-1.1,0c-.36-.183-.717-.372-1.085-.534a.482.482,0,0,0-.351,0c-.349.154-.688.328-1.027.507a1.229,1.229,0,0,1-1.216,0c-.32-.168-.648-.318-.963-.492a.465.465,0,0,0-.494,0c-.33.179-.671.337-1,.507a1.161,1.161,0,0,1-1.119,0c-.36-.185-.717-.372-1.085-.536a.454.454,0,0,0-.332,0,9.134,9.134,0,0,0-1.01.515A.711.711,0,0,1,0,19.124C.019,16.166,0,13.208,0,10.251ZM8.162,3.807c0-.221.011-.421,0-.631a.452.452,0,1,0-.9,0,4.72,4.72,0,0,0,0,.488.182.182,0,0,1-.154.21,2.354,2.354,0,0,0-1.168.658A1.584,1.584,0,0,0,6.09,6.958a3.423,3.423,0,0,0,.728.421c.45.21.919.366,1.372.564a2.674,2.674,0,0,1,.6.345.677.677,0,0,1,.08,1.031,1.4,1.4,0,0,1-.753.45,2.278,2.278,0,0,1-1.893-.438.458.458,0,0,0-.69.074.468.468,0,0,0,.181.673,3.692,3.692,0,0,0,1.548.631c0,.21,0,.389,0,.581a.456.456,0,1,0,.911,0v-.421c0-.137.021-.185.16-.21a2.325,2.325,0,0,0,1.092-.585,1.611,1.611,0,0,0-.172-2.56A3.787,3.787,0,0,0,8.6,7.152c-.389-.17-.791-.309-1.178-.48a4.026,4.026,0,0,1-.732-.381.7.7,0,0,1-.065-1.159,1.527,1.527,0,0,1,.911-.421A2.409,2.409,0,0,1,9.22,5.2a.456.456,0,0,0,.667-.067.467.467,0,0,0-.162-.677,3.65,3.65,0,0,0-1.563-.646ZM7.708,14.98H4.249a1.249,1.249,0,0,0-.295.027.444.444,0,0,0,0,.858,1.25,1.25,0,0,0,.295.027h7.068a.456.456,0,1,0,0-.911h-.189Zm.017-1.809H4.182a.482.482,0,0,0-.507.271c-.145.324.095.631.492.631h7.089a.484.484,0,0,0,.465-.236.451.451,0,0,0-.452-.669C10.1,13.168,8.907,13.173,7.724,13.17Z"
                      transform="translate(0 0)" fill="#a5b5bb" />
                  </g>
                </svg>

                <span class="fonte-menu">Holerite</span>
              </div>
            </a>
          </li>

        <?php }
         ?>

        <li id="projetos" class="menus">
          <a href="javascript:void(0)" onclick="link('dadosCadastrais/public/')" class="btnSidebar">
            <div class="w-100 d-flex align-items-center">
              <svg id="Camada_2" data-name="Camada 2" xmlns="http://www.w3.org/2000/svg" width="16.272" height="21.254"
                viewBox="0 0 16.272 21.254">
                <g id="Camada_1" data-name="Camada 1">
                  <path id="Path_77227" data-name="Path 77227"
                    d="M8.15,64.413H2.292a1.86,1.86,0,0,1-1.98-1.331,3.967,3.967,0,0,1-.272-1.16,6.561,6.561,0,0,1,.521-3.657,4.85,4.85,0,0,1,3.205-2.52,2.38,2.38,0,0,1,1.731.225,5.34,5.34,0,0,0,5.264,0,2.594,2.594,0,0,1,2.126-.13,4.947,4.947,0,0,1,3.371,4.72,6.706,6.706,0,0,1-.166,2.178,2.055,2.055,0,0,1-1.349,1.573,2.7,2.7,0,0,1-.748.1C12.054,64.415,10.114,64.413,8.15,64.413Z"
                    transform="translate(0 -43.159)" fill="#a5b5bb" />
                  <path id="Path_77228" data-name="Path 77228"
                    d="M16.83,11.237a5.619,5.619,0,1,1,5.619-5.558,5.619,5.619,0,0,1-5.619,5.558Z"
                    transform="translate(-8.691 0.001)" fill="#a5b5bb" />
                </g>
              </svg>

              <span class="fonte-menu">Meus Dados</span>
            </div>
          </a>
        </li>

        <li id="projetos" class="menus">
          <a href="javascript:void(0)" onclick="link('timesheet/fragment/timesheet.frag.php?menu=timesheet')"
            class="btnSidebar">
            <div class="w-100 d-flex align-items-center">
              <svg id="Camada_2" data-name="Camada 2" xmlns="http://www.w3.org/2000/svg" width="20.459" height="19.991"
                viewBox="0 0 20.459 19.991">
                <g id="Camada_1" data-name="Camada 1">
                  <path id="Path_77231" data-name="Path 77231"
                    d="M20.459,31.227V43.712a.823.823,0,0,1-.83.811H.832A.823.823,0,0,1,0,43.71V31.218a.809.809,0,0,1,.816-.8H19.633a.817.817,0,0,1,.826.807Zm-10.234,11.5a5.275,5.275,0,1,0,.02-10.546,5.275,5.275,0,1,0-.02,10.546Z"
                    transform="translate(0 -24.531)" fill="#a5b5bb" />
                  <path id="Path_77232" data-name="Path 77232"
                    d="M20.5,1.742v2.4a.588.588,0,0,1-.594.581H.634A.587.587,0,0,1,.05,4.145v-2.4a.587.587,0,0,1,.584-.581H3.1A.587.587,0,0,0,3.685.581h0A.588.588,0,0,1,4.279,0H4.3A.588.588,0,0,1,4.9.581h0a.587.587,0,0,0,.584.581H9.092A.587.587,0,0,0,9.676.581h0A.588.588,0,0,1,10.27.01H10.3a.587.587,0,0,1,.584.581V.581a.588.588,0,0,0,.594.581h3.613a.588.588,0,0,0,.594-.581h0A.588.588,0,0,1,16.282.01h0a.588.588,0,0,1,.594.581V.61a.588.588,0,0,0,.594.581h2.464a.588.588,0,0,1,.564.552Z"
                    transform="translate(-0.04)" fill="#a5b5bb" />
                  <path id="Path_77233" data-name="Path 77233"
                    d="M34.641,53.754a4.1,4.1,0,1,1,4.2-4.09A4.15,4.15,0,0,1,34.641,53.754Zm0-3.529h2.4a.588.588,0,0,0,.594-.581h0a.588.588,0,0,0-.594-.581H35.832a.588.588,0,0,1-.594-.581V47.31a.588.588,0,0,0-.594-.581h0a.588.588,0,0,0-.594.581v2.337a.574.574,0,0,0,.177.411.6.6,0,0,0,.423.167Z"
                    transform="translate(-24.419 -36.732)" fill="#a5b5bb" />
                </g>
              </svg>

              <span class="fonte-menu">Horas / Projetos</span>
            </div>
          </a>
        </li>
        <?php
        if ($usuarioSessao['gestaoProjeto'] == 'S') { ?>
          <li id="gestorProjeto" class="menus">
            <a href="javascript:void(0)"
              onclick="link('gestorProjeto/fragment/listagemGestorProjeto.frag.php?menu=gestorProjeto')"
              class="btnSidebar">
              <div class="w-100 d-flex align-items-center">
                <svg id="Camada_2" data-name="Camada 2" xmlns="http://www.w3.org/2000/svg" width="20.459" height="19.991"
                  viewBox="0 0 20.459 19.991">
                  <g id="Camada_1" data-name="Camada 1">
                    <path id="Path_77231" data-name="Path 77231"
                      d="M20.459,31.227V43.712a.823.823,0,0,1-.83.811H.832A.823.823,0,0,1,0,43.71V31.218a.809.809,0,0,1,.816-.8H19.633a.817.817,0,0,1,.826.807Zm-10.234,11.5a5.275,5.275,0,1,0,.02-10.546,5.275,5.275,0,1,0-.02,10.546Z"
                      transform="translate(0 -24.531)" fill="#a5b5bb" />
                    <path id="Path_77232" data-name="Path 77232"
                      d="M20.5,1.742v2.4a.588.588,0,0,1-.594.581H.634A.587.587,0,0,1,.05,4.145v-2.4a.587.587,0,0,1,.584-.581H3.1A.587.587,0,0,0,3.685.581h0A.588.588,0,0,1,4.279,0H4.3A.588.588,0,0,1,4.9.581h0a.587.587,0,0,0,.584.581H9.092A.587.587,0,0,0,9.676.581h0A.588.588,0,0,1,10.27.01H10.3a.587.587,0,0,1,.584.581V.581a.588.588,0,0,0,.594.581h3.613a.588.588,0,0,0,.594-.581h0A.588.588,0,0,1,16.282.01h0a.588.588,0,0,1,.594.581V.61a.588.588,0,0,0,.594.581h2.464a.588.588,0,0,1,.564.552Z"
                      transform="translate(-0.04)" fill="#a5b5bb" />
                    <path id="Path_77233" data-name="Path 77233"
                      d="M34.641,53.754a4.1,4.1,0,1,1,4.2-4.09A4.15,4.15,0,0,1,34.641,53.754Zm0-3.529h2.4a.588.588,0,0,0,.594-.581h0a.588.588,0,0,0-.594-.581H35.832a.588.588,0,0,1-.594-.581V47.31a.588.588,0,0,0-.594-.581h0a.588.588,0,0,0-.594.581v2.337a.574.574,0,0,0,.177.411.6.6,0,0,0,.423.167Z"
                      transform="translate(-24.419 -36.732)" fill="#a5b5bb" />
                  </g>
                </svg>
                <span class="fonte-menu">Gerente de projetos</span>
              </div>
            </a>
          </li>
          <?php
        }
        ?>

        <?php
        if ($usuarioSessao['isLider'] == 'S') {
          ?>
          <li id="lider" class="menus">
            <a href="javascript:void(0)" onclick="link('lider/fragment/listarLider.frag.php?menu=liderColaboradores')"
              class="btnSidebar">
              <div class="w-100 d-flex align-items-center">
                <svg id="Camada_2" data-name="Camada 2" xmlns="http://www.w3.org/2000/svg" width="20.459" height="19.991"
                  viewBox="0 0 20.459 19.991">
                  <g id="Camada_1" data-name="Camada 1">
                    <path id="Path_77231" data-name="Path 77231"
                      d="M20.459,31.227V43.712a.823.823,0,0,1-.83.811H.832A.823.823,0,0,1,0,43.71V31.218a.809.809,0,0,1,.816-.8H19.633a.817.817,0,0,1,.826.807Zm-10.234,11.5a5.275,5.275,0,1,0,.02-10.546,5.275,5.275,0,1,0-.02,10.546Z"
                      transform="translate(0 -24.531)" fill="#a5b5bb" />
                    <path id="Path_77232" data-name="Path 77232"
                      d="M20.5,1.742v2.4a.588.588,0,0,1-.594.581H.634A.587.587,0,0,1,.05,4.145v-2.4a.587.587,0,0,1,.584-.581H3.1A.587.587,0,0,0,3.685.581h0A.588.588,0,0,1,4.279,0H4.3A.588.588,0,0,1,4.9.581h0a.587.587,0,0,0,.584.581H9.092A.587.587,0,0,0,9.676.581h0A.588.588,0,0,1,10.27.01H10.3a.587.587,0,0,1,.584.581V.581a.588.588,0,0,0,.594.581h3.613a.588.588,0,0,0,.594-.581h0A.588.588,0,0,1,16.282.01h0a.588.588,0,0,1,.594.581V.61a.588.588,0,0,0,.594.581h2.464a.588.588,0,0,1,.564.552Z"
                      transform="translate(-0.04)" fill="#a5b5bb" />
                    <path id="Path_77233" data-name="Path 77233"
                      d="M34.641,53.754a4.1,4.1,0,1,1,4.2-4.09A4.15,4.15,0,0,1,34.641,53.754Zm0-3.529h2.4a.588.588,0,0,0,.594-.581h0a.588.588,0,0,0-.594-.581H35.832a.588.588,0,0,1-.594-.581V47.31a.588.588,0,0,0-.594-.581h0a.588.588,0,0,0-.594.581v2.337a.574.574,0,0,0,.177.411.6.6,0,0,0,.423.167Z"
                      transform="translate(-24.419 -36.732)" fill="#a5b5bb" />
                  </g>
                </svg>
                <span class="fonte-menu">Líder</span>
              </div>
            </a>
          </li>
          <?php
        }
        ?>
        <li id="Reembolso" class="menus">
          <a href="#ulReembolso" id="reembolsoList" class="btnSidebar" data-toggle="collapse" aria-expanded="false">
            <div class="w-100 d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z" />
              </svg>
              <span class="fonte-menu">Reembolso</span>
            </div>
          </a>

          <ul id="ulReembolso" class="collapse list-unstyled">


            <!-- <li>
              <a href="javascript:void(0)"
                onclick="link('reembolso_geral/fragment/reembolso_geral.frag.php?menu=reembolso_geral')">
                <span class=" fonte-sub-menu"> Reembolso Geral</span>
              </a>
            </li> -->

            <li>
              <a href="javascript:void(0)" onclick="link('reembolso/fragment/reembolso.frag.php?menu=reembolso')">
                <span class=" fonte-sub-menu"> Reembolso de Itens</span>
              </a>
            </li>

          </ul>

        </li>

        <li id="projetos" class="menus">
          <a href="javascript:void(0)"
            onclick="link('autoAvaliacaoTecnica/public/')" class="btnSidebar">

            <div class="w-100 d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15.422"
                height="19.968" viewBox="0 0 42.126 42.098">
                <defs>
                  <linearGradient id="linear-gradient" x1="0.029" y1="0.842" x2="0.96" y2="0.16"
                    gradientUnits="objectBoundingBox">
                    <stop offset="0" stop-color="#00ebcc" />
                    <stop offset="0.49" stop-color="#10b2d3" />
                    <stop offset="0.721" stop-color="#02abe0" />
                    <stop offset="1" stop-color="#07f" />
                  </linearGradient>
                </defs>
                <g id="tecnica" transform="translate(-0.013 -0.059)">
                  <g id="Camada_1" data-name="Camada 1" transform="translate(0.013 0.059)">
                    <path id="Path_77391" data-name="Path 77391"
                      d="M104.858,182.469c-.388-.077-.782-.132-1.162-.235a5.581,5.581,0,0,1-4.191-5.444,9.953,9.953,0,0,1,5.728-9.179c.11-.057.22-.11.376-.18a5.674,5.674,0,0,1-1.539-5.224,5.486,5.486,0,0,1,2.171-3.381,5.68,5.68,0,0,1,7.433.561,5.746,5.746,0,0,1,0,8.041l.429.22a9.928,9.928,0,0,1,5.651,9.224,5.606,5.606,0,0,1-5.032,5.526,2.917,2.917,0,0,0-.317.071Z"
                      transform="translate(-88.569 -140.371)" fill="url(#linear-gradient)" />
                    <path id="Path_77392" data-name="Path 77392"
                      d="M282.617,74.826c-.536.808-1.084,1.609-1.6,2.427a1.471,1.471,0,0,0-.22.676c-.046.779-.053,1.561-.075,2.342a1.245,1.245,0,0,1-1.7,1.252,17.382,17.382,0,0,1-1.688-.511,2.524,2.524,0,0,0-1.9.018c-.538.2-1.1.339-1.649.495a1.245,1.245,0,0,1-1.7-1.257c-.021-.808-.036-1.617-.076-2.418a1.092,1.092,0,0,0-.173-.525c-.44-.675-.913-1.333-1.364-2a1.232,1.232,0,0,1,.665-2c.746-.269,1.5-.521,2.24-.806a1.276,1.276,0,0,0,.511-.373c.5-.618.971-1.257,1.458-1.885a1.236,1.236,0,0,1,2.106,0c.48.616.942,1.246,1.437,1.851a1.474,1.474,0,0,0,.572.418c.66.263,1.33.508,2.009.719a1.588,1.588,0,0,1,1.146,1.013Z"
                      transform="translate(-240.492 -62.02)" fill="url(#linear-gradient)" />
                    <path id="Path_77393" data-name="Path 77393"
                      d="M9.135,81.538a10.845,10.845,0,0,1-1.352-.4A3.722,3.722,0,0,0,4.7,81.135a7.873,7.873,0,0,1-1.139.345,1.238,1.238,0,0,1-1.649-1.235c-.026-.822-.037-1.649-.077-2.467a1.1,1.1,0,0,0-.18-.524c-.44-.675-.913-1.333-1.365-2a1.225,1.225,0,0,1,.636-1.979c.733-.267,1.475-.509,2.2-.8a1.659,1.659,0,0,0,.636-.465c.5-.6.952-1.237,1.433-1.852a1.23,1.23,0,0,1,2.057.005c.507.647,1,1.309,1.509,1.951a1.109,1.109,0,0,0,.447.33c.743.279,1.5.528,2.243.8a1.251,1.251,0,0,1,.674,2.053c-.44.66-.9,1.306-1.34,1.971a1.09,1.09,0,0,0-.171.525c-.04.834-.049,1.671-.08,2.507A1.263,1.263,0,0,1,9.135,81.538Z"
                      transform="translate(-0.013 -61.959)" fill="url(#linear-gradient)" />
                    <path id="Path_77394" data-name="Path 77394"
                      d="M144.2,11.984c-.536-.156-1.224-.3-1.869-.55a2.631,2.631,0,0,0-2.018.008,16.388,16.388,0,0,1-1.614.481,1.223,1.223,0,0,1-1.677-1.187c-.038-.794-.031-1.591-.075-2.383a1.449,1.449,0,0,0-.214-.678c-.429-.668-.9-1.312-1.339-1.971a1.229,1.229,0,0,1,.638-1.979c.668-.243,1.333-.5,2.013-.708a1.739,1.739,0,0,0,.962-.707c.4-.557.824-1.094,1.244-1.634a1.25,1.25,0,0,1,2.162.01c.478.618.941,1.248,1.429,1.854a1.283,1.283,0,0,0,.513.368c.753.289,1.521.54,2.278.821a1.228,1.228,0,0,1,.639,1.954c-.456.684-.938,1.351-1.387,2.039a1.2,1.2,0,0,0-.181.564c-.042.863-.037,1.727-.087,2.589A1.224,1.224,0,0,1,144.2,11.984Z"
                      transform="translate(-120.269 -0.059)" fill="url(#linear-gradient)" />
                  </g>
                </g>
              </svg>
              <span class="fonte-menu">Auto Avaliação Técnica</span>
            </div>
          </a>
        </li>
        <li id="curriculo" class="menus">
          <a href="http://20.124.123.65/curriculo/login_consultor.php" target="_blank" class="btnSidebar">
            <div class="item-content">
              <div class="item-media">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="19" height="19" viewBox="0 0 19 19">

                  <g id="Documentos" transform="translate(-521 -597)" clip-path="url(#clip-path)">
                    <g id="Group_898" data-name="Group 898" transform="translate(57 28)">
                      <g id="Group_897" data-name="Group 897">
                        <path id="Path_4645" data-name="Path 4645" d="M15.174,3H7.835A1.835,1.835,0,0,0,6,4.835V19.514a1.835,1.835,0,0,0,1.835,1.835H18.844a1.835,1.835,0,0,0,1.835-1.835V8.5Z" transform="translate(461 567)" fill="none" stroke="#ccc" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Path_4646" data-name="Path 4646" d="M21,3V8.5h5.5" transform="translate(455.174 567)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                      </g>
                      <line id="Line_99" data-name="Line 99" x2="9.342" transform="translate(469.5 581.913)" fill="none" stroke="#ccc" stroke-linecap="round" stroke-width="1.5"/>
                      <line id="Line_101" data-name="Line 101" x2="9.342" transform="translate(469.5 578.913)" fill="none" stroke="#ccc" stroke-linecap="round" stroke-width="1.5"/>
                      <line id="Line_102" data-name="Line 102" x2="3" transform="translate(469.5 575.913)" fill="none" stroke="#ccc" stroke-linecap="round" stroke-width="1.5"/>
                      <line id="Line_103" data-name="Line 103" x2="3" transform="translate(469.5 572.913)" fill="none" stroke="#ccc" stroke-linecap="round" stroke-width="1.5"/>
                      <line id="Line_100" data-name="Line 100" x2="9.342" transform="translate(469.5 584.913)" fill="none" stroke="#ccc" stroke-linecap="round" stroke-width="1.5"/>
                    </g>
                  </g>
                </svg>

              </div>
              <div class="item-inner">
                <span class="title">Currículo</span>
              </div>
            </div>
          </a>
        </li>
        <li id="projetos" class="menus">
          <a href="javascript:void(0)"
            onclick="link('politicasInstitucionais/fragment/politicasInstitucionais.frag.php?menu=politicasInstitucionais')"
            class="btnSidebar">
            <div class="w-100 d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
              </svg>

              <span class="fonte-menu">Políticas Institucionais</span>
            </div>
          </a>
        </li>


        <li id="projetos" class="menus">
          <a href="javascript:void(0)" id="sair">
            <div class="w-100 d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
              </svg>

              <span class="fonte-menu">Sair</span>
            </div>
          </a>
        </li>

        <?php
        // $d = dir(ROOT . "portal/modulos");
        // while (false !== ($pasta = $d->read())) {
        //     if ((is_dir($pasta) && ($pasta != "." && $pasta != "..")) && file_exists($pasta . '/menu.inc.php')) {
        //         require_once($pasta . '/menu.inc.php');
        //     }
        // }
        // $d->close();
        // 
        ?>
      </ul>
      <!-- <p class="text-center bt-blue copyright">© 2022 BlueShift.</p>
            <p class="text-center copyright">Todos os direitos reservados.</p> -->
    </div>
  </nav>

  <script type="text/javascript">
    const sidebar_links = document.querySelectorAll(".btnSidebar");

    function changeLink() {
      if (this.id !== "reembolsoList") {
        let meuElemento = document.getElementById('reembolsoList');
        if (meuElemento.parentElement.classList.contains('active')) {
          meuElemento.click();
        }
      }
      sidebar_links.forEach((sideLink) => {
        sideLink.classList.remove("active")
        sideLink.parentElement.classList.remove("active");
      });
      console.log(this.id);

      this.classList.add("active");
      this.parentElement.classList.add("active");
    }
    sidebar_links.forEach((link) => link.addEventListener("click", changeLink));
  </script>

  <!-- Page Content  -->
  <div id="content">
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>portal/modulos/controleAcesso/js/login.js">
    </script>
    <script>
      $('#sair').click(function () {
        window.location = '<?php echo HTTP_SERVER ?>portal/modulos/controleAcesso/service/logoff/';
      })
    </script>