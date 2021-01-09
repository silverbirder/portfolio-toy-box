import TeamAbilityAccomplishmentComponent from './assets/js/components/team-ability/teamAbilityAccomplishmentComponent.js'
import TeamAbilityCertificationComponent from './assets/js/components/team-ability/teamAbilityCertificationComponent.js'
import TeamAbilitySkillComponent from './assets/js/components/team-ability/teamAbilitySkillComponent.js'
import TeamMyselfAvatarComponent from './assets/js/components/team-myself/teamMyselfAvatarComponent.js'
import TeamMyselfBiographyComponent from './assets/js/components/team-myself/teamMyselfBiographyComponent.js'
import TeamMyselfCareerComponent from './assets/js/components/team-myself/teamMyselfCareerComponent.js'
import TeamMyselfInterestComponent from './assets/js/components/team-myself/teamMyselfInterestComponent.js'
import TeamMyselfLinkComponent from './assets/js/components/team-myself/teamMyselfLinkComponent.js'
import TeamPageTopComponent from './assets/js/components/team-page/teamPageTopComponent.js'
import TeamPageBlogComponent from './assets/js/components/team-page/teamPageBlogComponent.js'
import TeamPageProjectComponent from './assets/js/components/team-page/teamPageProjectComponent.js'

import {Router} from 'https://unpkg.com/@vaadin/router';

customElements.define('team-ability-accomplishment', TeamAbilityAccomplishmentComponent)
customElements.define('team-ability-certification', TeamAbilityCertificationComponent)
customElements.define('team-ability-skill', TeamAbilitySkillComponent)
customElements.define('team-myself-avatar', TeamMyselfAvatarComponent)
customElements.define('team-myself-biography', TeamMyselfBiographyComponent)
customElements.define('team-myself-career', TeamMyselfCareerComponent)
customElements.define('team-myself-interest', TeamMyselfInterestComponent)
customElements.define('team-myself-link', TeamMyselfLinkComponent)
customElements.define('team-page-top', TeamPageTopComponent)
customElements.define('team-page-blog', TeamPageBlogComponent)
customElements.define('team-page-project', TeamPageProjectComponent)

const outlet = document.getElementById('outlet');
const router = new Router(outlet);
router.setRoutes([
    {path: '/', component: 'team-page-top'},
    {path: '/blog', component: 'team-page-blog'},
    {path: '/project', component: 'team-page-project'}
]);
