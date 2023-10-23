<footer class="footer">

    <div class="_main s-container">

        <div class="s-layout:122 s-gap:column:50 @mobile s-layout:1_2">

            <div>

                <a href="/" title="Coffeekraken.io">
                    @include ('sugar.logos.coffeekraken.coffeekraken')
                </a>

                <p class="s-typo:p:small s-mbe:30">
                    Designed and built with all the love in the world <span class="s-tc:accent">+1</span> by the
                    Coffeekraken team with the help of our
                    friends and partners.
                </p>

                <p>Under <a class="s-typo:bold s-mbe:20 s-tc:accent"
                        href="https://github.com/Coffeekraken/coffeekraken/blob/master/LICENSE" target="_blank"
                        title="Coffeekraken.io">MIT</a> License</p>
                <p>Current version: <bold class="s-typo:bold s-tc:accent">{{ $frontspec->package->version }}</bold>
                </p>

            </div>


            <div class="_columns">
                <div></div>
                <div>
                    <h1 class="s-typo:h5 s-mbe:30">
                        Links
                    </h1>
                    <ol class="s-list:ul s-color:accent">
                        <li>
                            <a href="https://github.com/Coffeekraken/coffeekraken" title="Coffeekraken on Github">Github repo</a>
                        </li>
                        <li>
                            <a href="https://www.npmjs.com/search?q=%40coffeekraken"
                                title="Coffeekraken on NPM">NPM packages</a>
                        </li>
                    </ol>
                </div>
                
                <div>
                    <h1 class="s-typo:h5 s-mbe:30">
                        Community
                    </h1>
                    <ol class="s-list:ul s-color:accent s-mbe:30">
                        <li>
                            <a href="https://discord.com/channels/940362961682333767/940362962223378494" title="Discord"
                                target="_blank">Join us on Discord</a>
                        </li>
                        <li>
                            <a href="https://github.com/Coffeekraken/coffeekraken/issues"
                                title="Coffeekraken issues on Github" target="_blank">Issues on Github</a>
                        </li>
                        <li>
                            <a href="https://www.patreon.com/coffeekraken" title="Contribute to Coffeekraken"
                                target="_blank">Support us on
                                Patreon</a>
                        </li>
                        <li>
                            <a href="https://github.com/Coffeekraken/coffeekraken" title="Our contributors">Our
                                contributors</a>
                        </li>
                    </ol>

                </div>

            </div>

        </div>

    </div>

    {{-- <div class="_collab">

        <div class="_bkg">
            @include('generic.logos.weWantYou')
        </div>

        <div class="s-container">

            <p class="s-typo:h6">
                In collaboration with
            </p>

            <a href="https://buzzbrothers.gitbook.io/specimen" target="_blank" title="Specimen">
                @include('sugar.logos.specimen.specimen')
            </a>

            <div class="_join">
                <a class="s-btn s-color:complementary" href="https://discord.com/login?redirect_to=%2Fchannels%2F940362961682333767%2F940362962223378494" target="_blank" title="Join us on Discord">
                    <i class="s-icon:discord"></i>
                    Join us on Discord!                
                    <i class="s-icon:discord"></i>
                </a>
            </div>

        </div>

    </div> --}}

</footer>
