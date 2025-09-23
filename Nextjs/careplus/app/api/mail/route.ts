import { NextRequest, NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import FormData from "form-data";
// To handle a GET request to /api
export async function GET(req: NextRequest, res: NextResponse) {
  // Do whatever you want
  return NextResponse.json(
    { message: "Hello World chal kyu nahir aha" },
    { status: 200 }
  );
}

// To handle a POST request to /api
export async function POST() {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "2b91eb47-1953b6c8",
  });
  let msd;
  mg.messages
    .create("sandbox-123.mailgun.org", {
      from: "Excited User <mailgun@sandbox29d9c41fba7747848d3a9db6b5923fe1.mailgun.org>",
      to: ["enthusiasticlearner13@gmail.com"],
      subject: "Hello",
      text: "Testing some Mailgun awesomeness!",
      html: "<h1>Testing some Mailgun awesomeness!</h1>",
    })
    .then((msg) => {
      console.log(msg);
      msd = msg;
    }) // logs response data
    .catch((err) => console.log(err));

  return NextResponse.json({ message: msd }, { status: 200 });
}
