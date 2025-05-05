import PageMain from '../pages/PageMain';
import PageTests from '../pages/PageTests';
import PageQuestions from '../pages/PageQuestions';
import PageAnswers from '../pages/PageAnswers';
/*import PageUsers from '../pages/PageUsers';*/
import PageRegistration from '../components/auth/PageRegistration';
import PageLogin from '../components/auth/PageLogin';
import PageLogout from '../components/auth/PageLogout';
import PageReadyForPassTest from '../pages/PageReadyForPassTest';
import PageTestResults from '../pages/PageTestResults';
import PageChangePassword from '../components/auth/PageChangePassword';

export const PAGE_MAIN_ROUTE = '/';
export const PAGE_TEST_ROUTE = '/test';
export const PAGE_QUESTION_ROUTE = '/question';
export const PAGE_ANSWER_ROUTE = '/answer';
export const PAGE_TEST_READY_FOR_PASS_ROUTE = '/ready-for-pass';
export const PAGE_TEST_RESULTS_ROUTE = '/test-results';
//export const PAGE_USER_ROUTE = '/user';
export const PAGE_REGISTRATION_ROUTE = '/registration';
export const PAGE_LOGIN_ROUTE = '/login';
export const PAGE_LOGOUT_ROUTE = '/logout';
export const PAGE_CHANGE_PASSWORD_ROUTE = '/change-password';

export const notAuthRoutes = [
    {path: PAGE_REGISTRATION_ROUTE, component: <PageRegistration/>, exact: true},
    {path: PAGE_LOGIN_ROUTE, component: <PageLogin/>, exact: true},
    {path: PAGE_CHANGE_PASSWORD_ROUTE+'/:uuid', component: <PageChangePassword/>, exact: true},
    {path: '*', component: <PageLogin/>, exact: true},
];
export const AuthRoutes = [
    {path: PAGE_MAIN_ROUTE, component: <PageMain/>, exact: true},
    {path: PAGE_TEST_ROUTE, component: <PageTests/>, exact: true},
    {path: PAGE_TEST_ROUTE+'/:idTest'+PAGE_QUESTION_ROUTE, component: <PageQuestions/>, exact: true},
    {path: PAGE_TEST_ROUTE+'/:idTest'+PAGE_QUESTION_ROUTE+'/:idQuestion'+PAGE_ANSWER_ROUTE, component: <PageAnswers/>, exact: true},

    {path: PAGE_TEST_READY_FOR_PASS_ROUTE+'/:idTest/:uuid', component: <PageReadyForPassTest/>, exact: true},
    {path: PAGE_TEST_RESULTS_ROUTE+'/:idTest', component: <PageTestResults/>, exact: true},
    
    {/*path: PAGE_USER_ROUTE, component: <PageUsers/>, exact: true*/},
    {path: PAGE_LOGOUT_ROUTE, component: <PageLogout/>, exact: true},
    {path: '*', component: <PageMain/>, exact: true},
];