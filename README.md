
Doskara Sample Project:

Requirements:
node, npm

Main Concept:

There are four components.

Project: Main definition for a project

Transformer: A component defined and used in Project. This is when a developer wants to create a separate component, but doesn't want to launch a completely different cell.

Webfront: An empty web server that can proxy to other servers or interact with other cells through events.

DataStore: A mocked version of a database.

In our scenario, only Project and Transformer are actually owned by the owner of the project. Webfront and Datastore are hypothetical components written by third parties, and the owner is paying them a subscription to use their code.

To see what happens, launch the install script, (make_project.sh) to clone all three repositories and start each server. The script will launch localhost:8000/ in a new browser window.

The "/" path is proxied through the webfront component to the Project component, which just returns raw html.

The raw html contains a script that makes a GET request to "/getAll", which, through the webfront, queries the datastore and returns a list of strings, which are rendered.

If you submit a new string, it makes a POST request to "/" which, through the webfront, passes the data to the datastore. The datastore has a beforeSave hook, which, if applied, will push the data through the hook and save the result. In our case, we configured the Transformer to be a beforeSave hook, which just reverses the string you entered. This is an example of the true power of this framework. We were able to set up complicated interaction between the component and the owner, which is almost impossible with Saas.



Hooks:

You'll notice that there were several interactions between components that aren't owned by the owner of Project. Here are the interactions:

Webfront => Project (index)

Webfront => DataStore (getAll)

Webfront => DataStore (save)

DataStore => Transformer (beforeSave)

This is configured by the owner of the project. I haven't decided whether or not this configuring happens within the actual code, or in a configuration file (see Doskara.json). But each component will declare which events are available, and then the owner will hook them up.
