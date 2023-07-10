<template s-lazy>

    <section class="section" id="documentation">

        <div class="s-container">

            <div class="_layout s-mbe:50">
                
                <div>
                    <i class="s-icon:documentation _icon-title"></i>
                    <h2 class="s-typo:h2 s-mbe:30 _title">
                        Documentation
                    </h2>
                    <p class="s-typo:h4 s-mbe:30">
                        Here all the available mixins, functions and configurations
                    </p>
                </div>

            </div>

            <div class="_doc" s-deps css="inputContainer,hide,depth,disabled,scale,transision,opacity,shape,list,grid,flex,gap,border,text,fit">
                <s-doc></s-doc>
            </div>

        </div>

    </section>

</template>