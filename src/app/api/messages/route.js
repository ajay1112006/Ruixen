import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';
const dataFilePath = path.join(process.cwd(), 'data', 'messages.json');



// Helper to ensure data directory and file exist
async function ensureDataFile() {
  const dir = path.dirname(dataFilePath);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify([]));
  }
}

export async function GET() {
  try {
    await ensureDataFile();
    const data = await fs.readFile(dataFilePath, 'utf-8');
    let messages = JSON.parse(data);
    
    // Filter out messages finished more than 24 hours ago
    const now = new Date();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    
    let changed = false;
    messages = messages.filter(msg => {
      if (msg.finished && msg.finishedAt) {
        const finishedTime = new Date(msg.finishedAt);
        if (now - finishedTime > oneDayInMs) {
          changed = true; // Mark that we need to save the cleaned-up array
          return false;
        }
      }
      return true;
    });

    if (changed) {
      await fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2));
    }
    
    // Return latest messages first
    return NextResponse.json({ messages: messages.reverse() });
  } catch (error) {
    console.error('Error reading messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    await ensureDataFile();
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const messages = JSON.parse(data);
    
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || 'Not provided',
      message,
      createdAt: new Date().toISOString()
    };
    
    messages.push(newMessage);
    await fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2));
    
    // Try sending email if credentials are provided
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: process.env.GMAIL_USER, // Send to yourself
          subject: `New Project Inquiry from ${name}`,
          text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Time: ${new Date().toLocaleString()}

Message:
${message}
          `,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #333;">New Project Inquiry</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <h3 style="color: #555;">Message:</h3>
              <p style="white-space: pre-wrap; color: #444; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Continue anyway since we saved to file
      }
    }
    
    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, finished } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Missing message ID' }, { status: 400 });
    }
    
    await ensureDataFile();
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const messages = JSON.parse(data);
    
    let updated = false;
    const newMessages = messages.map(msg => {
      if (msg.id === id) {
        updated = true;
        return {
          ...msg,
          finished,
          finishedAt: finished ? new Date().toISOString() : null
        };
      }
      return msg;
    });
    
    if (!updated) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    
    await fs.writeFile(dataFilePath, JSON.stringify(newMessages, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}
