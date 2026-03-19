import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Trash2, Image as ImageIcon, Film, PlusCircle, Info } from "lucide-react";

export default async function AdminPortfolioPage() {
  const projects = await db.portfolio.findMany({
    orderBy: { createdAt: "desc" }
  });

  async function addProject(formData: FormData) {
    "use server";
    const type = formData.get("type") as string;
    await db.portfolio.create({
      data: {
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        type: type,
        coverImage: formData.get("coverImage") as string,
        images: formData.get("images") as string, 
        videoUrl: type === "Videos" ? formData.get("videoUrl") as string : null,
      }
    });
    revalidatePath("/admin/portfolio");
    revalidatePath("/"); 
  }

  async function deleteProject(formData: FormData) {
    "use server";
    await db.portfolio.delete({
      where: { id: formData.get("id") as string }
    });
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
  }

  return (
    // ✨ FIX 1: Safed background hatane aur layout ko full width dene ke liye Bulletproof wrapper
    <div className="min-h-screen bg-[#09090b] text-zinc-100 w-full pt-28 pb-20 px-4 md:px-8 md:pl-72 overflow-x-hidden font-sans">
      
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Film className="text-green-500 w-8 h-8 md:w-10 md:h-10" />
          Portfolio Manager
        </h1>
        <p className="text-sm md:text-base text-zinc-400 mt-2">Manage your Photos, Videos, and Sliders for the live website.</p>
      </div>

      {/* ✨ FIX 2: Layout ko dabne se bachane ke liye Flex row/col system */}
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 md:gap-10">
        
        {/* --- LEFT SIDE: ADD NEW PROJECT FORM --- */}
        <div className="w-full xl:w-1/3">
          <div className="bg-zinc-900 border border-zinc-800 p-5 md:p-6 rounded-3xl sticky top-28 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-green-500" />
              Add New Project
            </h2>
            
            <form action={addProject} className="space-y-5">
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase">Project Type</label>
                <select name="type" className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-green-500 outline-none">
                  <option value="Photos">📸 Photos</option>
                  <option value="Videos">🎥 Videos</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase">Title</label>
                <input required type="text" name="title" placeholder="e.g. Commercial Array - Pali" className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-green-500" />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase">Category</label>
                <input required type="text" name="category" placeholder="e.g. Project Photo" className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-green-500" />
              </div>

              {/* 5-Year-Old Friendly Instruction Box */}
              <div className="bg-green-950/30 p-4 rounded-xl border border-green-900/50">
                <label className="text-xs text-green-400 font-bold uppercase flex items-center gap-1">
                  <Info className="w-3 h-3" /> Main Photo Link (Required)
                </label>
                <p className="text-[10px] text-zinc-400 mb-2 mt-1 leading-relaxed">
                  1. Go to your <b className="text-white">Gallery Studio</b>.<br/>
                  2. Upload photo from your PC/Phone.<br/>
                  3. Copy its link and paste it below!
                </p>
                <input required type="url" name="coverImage" placeholder="https://..." className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-green-500 text-sm" />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase">Slider Extra Photos (Optional)</label>
                <p className="text-[10px] text-zinc-500 mb-1">Paste extra photo links here, separate them with commas (,)</p>
                <textarea name="images" placeholder="https://link1.com, https://link2.com" className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-green-500 text-sm h-16" />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase">YouTube Video Link (Optional)</label>
                <input type="url" name="videoUrl" placeholder="https://youtube.com/..." className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-green-500 text-sm" />
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl transition-all mt-2">
                🚀 Publish to Website
              </button>
            </form>
          </div>
        </div>

        {/* --- RIGHT SIDE: PROJECT LIST --- */}
        <div className="w-full xl:w-2/3">
          {projects.length === 0 ? (
            <div className="h-[300px] md:h-[400px] border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-center p-6 md:p-10">
               <Film className="w-12 h-12 md:w-16 md:h-16 text-zinc-700 mb-4" />
               <h3 className="text-lg md:text-xl font-bold text-zinc-400">No Projects Yet!</h3>
               <p className="text-sm text-zinc-600 max-w-xs mt-2">Use the form to add your first project.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {projects.map((item) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all shadow-lg flex flex-col">
                  
                  {/* Photo Preview */}
                  <div className="relative h-40 md:h-48 w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.coverImage} alt={item.title} className="object-cover w-full h-full" />
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 text-white border border-zinc-700">
                      {item.type === "Videos" ? <Film className="w-3 h-3 text-green-400"/> : <ImageIcon className="w-3 h-3 text-blue-400"/>}
                      {item.type}
                    </div>
                  </div>
                  
                  {/* Details & Delete Button */}
                  <div className="p-4 md:p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-zinc-200 line-clamp-1 break-all">{item.title}</h4>
                      <p className="text-xs text-zinc-500 mt-1 mb-4">{item.category}</p>
                    </div>
                    
                    <form action={deleteProject}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className="w-full flex items-center justify-center gap-2 py-2 md:py-2.5 text-xs font-bold bg-zinc-950 hover:bg-red-600 hover:text-white text-red-400 border border-red-900/30 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}