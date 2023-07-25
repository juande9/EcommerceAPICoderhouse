import { resolve } from "path";
import fs from "fs";
import Handlebars from "handlebars";

export function compileEmailTemplate(templateName, data) {
  const templateDir = resolve('src/presentation/templates');
  const source = fs.readFileSync(`${templateDir}/${templateName}.hbs`).toString();
  const template = Handlebars.compile(source);
  return template(data);
}
