<script>
  import { getDevice } from "framework7/lite-bundle";
  import "../css/app.css";
  import {
    f7,
    f7ready,
    App,
    Panel,
    Views,
    View,
    Popup,
    Page,
    Navbar,
    Toolbar,
    NavRight,
    Link,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListItem,
    ListInput,
    ListButton,
    BlockFooter,
    Button,
  } from "framework7-svelte";

  import routes from "../js/routes";

  const device = getDevice();
  // Framework7 Parameters
  let f7params = {
    name: "My App", // App name
    theme: "auto", // Automatic theme detection
    routes,
  };
  // Login screen demo data
  let username = "";
  let password = "";

  function alertLoginData() {
    f7.dialog.alert(
      "Username: " + username + "<br>Password: " + password,
      () => {
        f7.loginScreen.close();
      }
    );
  }
</script>

<App {...f7params} dark>
  <!-- Left panel with cover effect-->
  <Panel left cover dark swipe>
    <View>
      <Page>
        <Navbar title="Left Panel" />
        <Block>Left panel content goes here</Block>
      </Page>
    </View>
  </Panel>

  <Panel right reveal swipe>
    <View>
      <Page>
        <Navbar title="Settings" />
      </Page>
    </View>
  </Panel>

  <View main class="safe-areas" url="/" />
</App>
