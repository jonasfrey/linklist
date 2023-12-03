import { 
    o_variables, 
    f_s_css_from_o_variables,
    f_add_css,
} from "https://deno.land/x/f_add_css@0.8/mod.js"

  import {
    f_o_html__and_make_renderable
} from "https://deno.land/x/f_o_html_from_o_js@2.0/mod.js"

f_add_css(
    f_s_css_from_o_variables(
        o_variables
    )
)
f_add_css(
    `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`
    // `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js`
)
f_add_css(
    `.a_o{
        display:flex;
        flex-direction: column;
    }
    .o{
        display:flex;
        flex-direction:row;
    }
    `
)
console.log('asdf')
//select > publish to web in google docs !!!
let s_sheet_id = `2PACX-1vSIiL-NqEDHMSPvf01eNo-h5ObV5UVeoFQCCTA1jbOf3r5UA_W3KU8CAxXuDIMekBW7ZfweDU6rBT5j`;
let o_data = await fetch(
    `https://docs.google.com/spreadsheets/d/e/${s_sheet_id}/pub?output=csv`
)
let s_text = await o_data.text();
s_text = s_text.replaceAll('\r', '');
let a_s_line = s_text.split('\n');
let s_separator = ',';
let a_s_prop = a_s_line[0].split(s_separator)
console.log(a_s_prop)

let a_o = a_s_line.slice(1).map(
    s_line=>{
        return Object.assign(
            {}, 
            ...s_line.split(s_separator).map(
                (s, n_idx)=>{
                    return {
                        [a_s_prop[n_idx]]:s
                    }
                }
            )
        )
    }
)
console.log(a_o)
let o = f_o_html__and_make_renderable(
    {
        class: "a_o",
        a_o: a_o.map(
            o=>{
                return {
                    class: 'o', 
                    a_o:[
                        {
                            s_tag: 'i', 
                            class: o.s_iconclass  
                        },
                        {
                            s_tag: "a", 
                            href: o.s_url, 
                            innerText: o.s_text
                        },
                        {
                            s_tag: "h2", 
                            innerText: o.s_description
                        }   
                    ]
                }
            }
        )
    }
);
document.body.appendChild(o)
console.log(a_o)
