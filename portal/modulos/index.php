<?php
    error_reporting(E_STRICT);
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Pragma: no-cache");
    header("Expires: 0");
    session_start();

    require_once('../../properties.inc.php');
    require_once('../../properties.db.inc.php');
    require_once(DOFMW . '/Do.class.php');

    require_once('../../portal/include/top.inc.php');
    require_once('../../portal/include/sidebar.inc.php');

    $usuarioSessao = $do->getUserSession();
    $documento = $usuarioSessao['documento'];
    $codigo = $usuarioSessao['codigo'];
?>

<div id="pagina">
    <div id="frameBody" class="body-frame"></div>
</div>

<script>
    $('#frameBody').html('<iframe id="content-frame" src="home.php?menu=home" name="content-frame" frameborder="0" noresize="noresize" onLoad="atualizarMenu(this.contentWindow.location);"></iframe>');

    function link(url) {
        document.getElementById("content-frame").src = url;
        return false;
    }

    let loadingObserver = new MutationObserver(function(mutations) {
        mutations.some(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                loading.open();
                return true;
            }
            return false;
        })
    }).observe($('#content-frame')[0], {
        attributeFilter: ['src'],
    });

    // oculta o spinner quando o iframe é carregado
    $('#content-frame').on('load', function() {
        loading.close();
    })

    function atualizarMenu(url) {
        url = url.href;
        if (url != '' && url != 'about:blank') {
            url = url.split('menu=');
            var menu = url[url.length - 1];
        } else {
            menu = 'home';
        }

        $('#sidebar ul li').each(function() {
            $(this).removeClass('active');
            if ($(this).find('a').attr('onclick') != undefined) {
                var id = $(this).attr('id');

                if (id == undefined) {
                    id = $(this).parents('.menus').attr('id');
                }

                if (menu.indexOf(id) != -1) {
                    if ($(this).find('a').attr('onclick').split("'")[1] == url.join('menu=').split('modulos/')[1]) {
                        $(this).addClass('active');
                    }

                    if ($(this).parents('.collapse').length > 0) $(this).parents('.collapse').parents('li').addClass('active');
                }
            }
        });
    }

    var codigo = "<?php echo $codigo; ?>"
    var documento = "<?php echo $documento; ?>"
    setInterval(() => {
        $.post('controleAcesso/service/verificarSessao/verificar.php',{})
        .done(function(result){
            if (result == 1) {
                location.href = "../login"                            
            }            
            })           
    }, 300000);

</script>
</div>
</div>

<?php
    require_once('../../portal/include/bottom.inc.php');
?>