import {createServerClient} from "@supabase/ssr";import {NextResponse} from "next/server";
export async function middleware(request:Request){
 const response=NextResponse.next({request:{headers:request.headers}});
 const supabase=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll(){return request.headers.get("cookie")?.split("; ").map(x=>{const i=x.indexOf("=");return{name:x.slice(0,i),value:x.slice(i+1)}})||[]},setAll(){}}});
 await supabase.auth.getUser(); return response;
}
export const config={matcher:["/dashboard/:path*","/admin/:path*","/agendar/:path*"]};