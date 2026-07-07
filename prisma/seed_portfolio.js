"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var projects, _i, projects_1, p;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Seeding portfolio data...');
                    // Clear existing (optional, but good for resetting during dev)
                    return [4 /*yield*/, prisma.portfolio.deleteMany()];
                case 1:
                    // Clear existing (optional, but good for resetting during dev)
                    _a.sent();
                    projects = [
                        {
                            title: "MiniLife Virtual Pet",
                            slug: "minilife-virtual-pet",
                            description: "An immersive, responsive virtual pet companion app designed for family bonding. Features a dynamic pet room dashboard, pixel-art cinematic animations, and real-time state management. Perfectly adapts fluidly across mobile and desktop environments.",
                            clientName: "MiniLife",
                            role: "Lead Full-Stack Developer & UI/UX Architect",
                            link: "https://minilife.online",
                            featured: true,
                            coverImage: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=2074&auto=format&fit=crop", // A nice colorful game-like placeholder
                            releaseDate: new Date("2026-04-04"),
                        },
                        {
                            title: "SpeakBuddy AI Platform",
                            slug: "speakbuddy-ai-platform",
                            description: "A secure, serverless language learning application leveraging Alibaba Cloud's native DashScope (Qwen) APIs. Incorporates advanced Speech-to-Text and Text-to-Speech protocols to deliver real-time interactive conversational practice.",
                            clientName: "SpeakBuddy Edu",
                            role: "Backend Architect & AI Integration",
                            featured: true,
                            coverImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop", // Edu/Tech placeholder
                            releaseDate: new Date("2026-04-01"),
                        },
                        {
                            title: "Dulaidila Delivery CMS",
                            slug: "dulaidila-cms",
                            description: "A hyper-fast, highly optimized bespoke CMS built with Next.js 16 (Turbopack) and Prisma. Equipped with a custom Rich Text Editor, full SEO Baidu integration, and completely customized beautiful Dark-Mode Glassmorphism interface.",
                            clientName: "Internal Studio",
                            role: "Full-Stack Development",
                            link: "https://dulaidila.com",
                            featured: false,
                            coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", // Code/CMS placeholder
                            releaseDate: new Date("2026-03-31"),
                        },
                        {
                            title: "Neon Financial Dashboard",
                            slug: "neon-financial-dashboard",
                            description: "Concept enterprise analytics dashboard featuring advanced Framer Motion transitions, D3 data visualizations, and robust state management for a high-frequency trading simulation.",
                            clientName: "Concept Project",
                            role: "Frontend Engineer",
                            featured: false,
                            coverImage: "https://images.unsplash.com/photo-1642543492481-44e81e3914a8?q=80&w=2070&auto=format&fit=crop", // Finance/chart placeholder
                            releaseDate: new Date("2025-11-15"),
                        }
                    ];
                    _i = 0, projects_1 = projects;
                    _a.label = 2;
                case 2:
                    if (!(_i < projects_1.length)) return [3 /*break*/, 5];
                    p = projects_1[_i];
                    return [4 /*yield*/, prisma.portfolio.create({
                            data: p
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('Seeded', projects.length, 'portfolio items!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
