#!/usr/bin/env node

var nodeVersion = "v6.9.1";

if (nodeVersion !== process.version) {
  console.log(`Incorrect node version. Found ${process.version} Expected: ${nodeVersion}`);
  console.log('use n to update the node version')
}


//var execSync = require('child_process').execSync;








//
// node_version=6.9.1
//
//
// # check current node version
//
// node_is_installed() {
//   if ! [ -x `command -v node` ]; then
//     echo "node is not installed"
//     return 1;
//   fi
// }
//
// n_is_installed() {
//   if ! [ -x `command -v n` ]; then
//     echo "n is not installed"
//     return 1;
//   fi
// }
//
// node_version_is_correct() {
//   current_node_version=`node -v`;
//   if [[ $current_node_version == "v$node_version" ]]; then
//     echo "current node version is: $current_node_version";
//   else
//     echo "node version $current_node_version is incorrect, expected $node_version"
//     return 1;
//   fi
// }
//
// set_node_version() {
//   if n_is_installed; then
//
//   else
//     return 1;
//   fi
// }
//
//
// if node_is_installed; then
//   if node_version_is_correct; then
//     exit 0;
//   else
//     set_node_version;
//   fi
// else
//   set_node_version;
// fi
//
//
//
