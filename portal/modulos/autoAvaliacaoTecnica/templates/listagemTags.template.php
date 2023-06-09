<div id="avaliacao-tags" class="table-responsive table-container">
    <table id="tableListagemTags" class="table-bordered text-center mb-0" data-locale="pt-BR" data-sticky-header="true" data-sticky-header-offset-left="1.5rem" data-sticky-header-offset-right="1.5rem" data-sortable="true">
        <thead>
            <tr>
                <th class="text-center th-first" data-width="10" data-unit="%"></th>
                <th class="text-center" data-width="30" data-unit="%">Ferramenta/Linguagem/Tecnologia</th>
                <th class="text-center" data-width="40" data-unit="%">Nível de Conhecimento (0 à 9)</th>
                <th class="text-center" data-width="10" data-unit="%">
                    Estudo
                    <a tabindex="0" class="popover-dismiss info-popover" role="button" data-toggle="popover" data-trigger="focus" title="Atenção" data-content="Marque essa opção se adquiriu esse conhecimento em Estudos.">
                        <i class="color-blue fas fa-info-circle popover-dismiss"></i>
                    </a>
                </th>
                <th class="text-center" data-width="10" data-unit="%">
                    Projeto
                    <a tabindex="0" class="popover-dismiss info-popover" role="button" data-toggle="popover" data-trigger="focus" title="Atenção" data-content="Marque essa opção se adquiriu esse conhecimento em Projetos.">
                        <i class="color-blue fas fa-info-circle popover-dismiss"></i>
                    </a>
                </th>
            </tr>
        </thead>
        <tbody id="bodyAvaliacao">
            <?php foreach ($listagem_tags as $classe => $tags) : ?>
                <tr class="first-tr">
                    <td class="text-center text-capitalize" rowspan="<?= count($tags) + 1 ?>">
                        <div class="vertical-text font-weight-bold">
                            <?= $classe ?>
                        </div>
                    </td>
                </tr>
                <?php foreach ($tags as $i => $tag) : ?>
                    <tr>
                        <td class="text-left">
                            <input type="hidden" name="nomeTag[<?= $tag['codigo'] ?>]" value="<?= $tag['tag'] ?>">
                            <?= $tag['tag'] ?>
                        </td>
                        <td class="text-center overflow-initial">
                            <div class="slider-wrapper slider-strips slidecontainer w-100">
                                <input class="input-range slider w-100" type="text" data-slider-id="tagSlider-<?= $tag['codigo'] ?>" data-slider-tooltip="always" data-slider-min="0" data-slider-max="9" data-slider-step="1" data-slider-value="<?= ($tag['senioridade']) ?: '0' ?>" name="senioridade[<?= $tag['codigo'] ?>]" value="<?= ($tag['senioridade']) ?: '0' ?>" />
                            </div>
                        </td>
                        <td>
                            <div class="custom-control custom-checkbox">
                                <input type="hidden" name="estudo[<?= $tag['codigo'] ?>]" value="N">
                                <input
                                    class="custom-control-input" type="checkbox"
                                    id="estudo-<?= $tag['codigo'] ?>"
                                    data-value="<?= $tag['codigo'] ?>"
                                    name="estudo[<?= $tag['codigo'] ?>]"
                                    value="S"
                                    <?= ($tag['estudo']) ? 'checked' : '' ?>
                                >
                                <label class="custom-control-label" for="estudo-<?= $tag['codigo'] ?>">
                                </label>
                            </div>
                        </td>
                        <td>
                            <div class="custom-control custom-checkbox">
                                <input type="hidden" name="projeto[<?= $tag['codigo'] ?>]" value="N">
                                <input
                                    class="custom-control-input" type="checkbox"
                                    id="projeto-<?= $tag['codigo'] ?>"
                                    data-value="<?= $tag['codigo'] ?>"
                                    name="projeto[<?= $tag['codigo'] ?>]"
                                    value="S" <?= ($tag['projeto']) ? 'checked' : '' ?>
                                >
                                <label class="custom-control-label" for="projeto-<?= $tag['codigo'] ?>">
                                </label>
                            </div>
                        </td>
                    </tr>
                <?php endforeach ?>
            <?php endforeach ?>
        </tbody>
    </table>
</div>