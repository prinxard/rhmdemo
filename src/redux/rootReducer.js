import { combineReducers } from 'redux';
import dashboard from './dashboard/dashboard';
import colors from './colors/colors';
import { config } from './config/config.reducer';
import leftSidebar from './left-sidebar/left-sidebar';
import palettes from './palettes/palettes';
import navigation from './navigation/navigation';
import modal from './modal/modal.reducer';
import signUp from './signup/signup.reducer';
import signUpAuth from './signup-auth/signup-auth.reducer';
import authentication from './authentication/auth.reducer';
import individualNavigation from './navigation/individualNav';
import navigationApprover from './navigation/navigationApprover';
import navigationApproverTcc from './navigation/navigationApproverTcc';
import navigationCreator from './navigation/navigationCreator';
import navigationCreatorTcc from './navigation/navigationCreatorTcc';
import navigationCreatorApprover from './navigation/navigationCreatorApprover';
import navigationAdmin from './navigation/navigationAdmin';
import navigationReport from './navigation/navigationReport';
import navigationAuditPrint from './navigation/navigationAuditPrint';
import navigationOtherTaxes from './navigation/navigationOtherTaxes';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signUp', 'signUpAuth', 'authentication'],
};

const rootReducer = combineReducers({
  dashboard,
  navigation,
  navigationApprover,
  navigationApproverTcc,
  navigationCreator,
  navigationCreatorTcc,
  navigationCreatorApprover,
  navigationAdmin,
  navigationReport,
  individualNavigation,
  navigationAuditPrint,
  navigationOtherTaxes,
  colors,
  config,
  leftSidebar,
  palettes,
  modal,
  signUp,
  signUpAuth,
  authentication,
});

export default persistReducer(persistConfig, rootReducer);
