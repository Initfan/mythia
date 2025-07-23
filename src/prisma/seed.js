"use strict";
// prisma/seed.ts
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var prisma_1 = require("@/lib/prisma");
var faker_1 = require("@faker-js/faker");
var GENRE = [
    "Fantasi",
    "Perkotaan",
    "Sejarah",
    "Fiksi Ilmiah",
    "Olahraga",
    "Permainan",
    "Timur",
    "Barat",
    "Realita",
    "Aksi",
    "Perang",
    "Akademi Fiksi",
    "Menegangkan",
    "Romantis",
    "Sejarah Fiksi",
    "Distopia",
    "Utopia",
    "Petualangan",
    "Kriminal",
    "Fiksi Spiritual",
    "Drama",
    "Slice of Life",
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var seed_user, seed_novel, users, authors, i, user, author, req, cover, i, author, novel, tag, ch, _loop_1, j;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    seed_user = 30;
                    seed_novel = 30;
                    console.log("🌱 Seeding data...");
                    console.time("user");
                    users = [];
                    authors = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < seed_user)) return [3 /*break*/, 5];
                    return [4 /*yield*/, prisma_1["default"].user.create({
                            data: {
                                username: faker_1.fakerID_ID.person.fullName(),
                                password: faker_1.fakerID_ID.internet.password(),
                                email: faker_1.fakerID_ID.internet.email()
                            }
                        })];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, prisma_1["default"].author.create({
                            data: {
                                pen_name: faker_1.fakerID_ID.person.fullName(),
                                phone: faker_1.fakerID_ID.phone.number(),
                                image: faker_1.fakerID_ID.image.avatar(),
                                gender: faker_1.fakerID_ID.helpers.arrayElement(["pria", "perempuan"]),
                                email: faker_1.fakerID_ID.internet.email(),
                                userId: user.id
                            }
                        })];
                case 3:
                    author = _a.sent();
                    users.push(user);
                    authors.push(author);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    console.log("✅ author n user created...", console.timeEnd());
                    console.time("genre");
                    GENRE.forEach(function (v) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma_1["default"].genre.create({ data: { genre: v } })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    console.log("✅ genre created...", console.timeEnd("genre"));
                    console.time("novel");
                    return [4 /*yield*/, fetch("".concat(process.env.UNSPLASH_ENDPOINT, "/photos/random?query=novel%20cover&client_id=").concat(process.env.UNSPLASH_CLIENT_ID, "&count=").concat(seed_novel))];
                case 6:
                    req = _a.sent();
                    if (!req.ok) return [3 /*break*/, 22];
                    return [4 /*yield*/, req.json()];
                case 7:
                    cover = _a.sent();
                    i = 0;
                    _a.label = 8;
                case 8:
                    if (!(i < seed_novel)) return [3 /*break*/, 22];
                    author = faker_1.fakerID_ID.helpers.arrayElement(authors);
                    return [4 /*yield*/, prisma_1["default"].novel.create({
                            data: {
                                title: "".concat(faker_1.fakerID_ID.word.adjective(), " ").concat(faker_1.fakerID_ID.word.noun(), " ").concat(faker_1.fakerID_ID.word.adverb()),
                                genre: faker_1.fakerID_ID.helpers.arrayElement(GENRE),
                                synopsis: faker_1.fakerID_ID.lorem.sentences(5),
                                content_rating: faker_1.fakerID_ID.helpers.arrayElement([
                                    "G",
                                    "PG",
                                    "PG-13",
                                    "R",
                                ]),
                                authorId: author.id,
                                cover: cover[i].urls.regular,
                                target_audience: faker_1.fakerID_ID.helpers.arrayElement([
                                    "dewasa",
                                    "remaja",
                                    "anak-anak",
                                ]),
                                status: faker_1.fakerID_ID.helpers.arrayElement([
                                    "berjalan",
                                    "selesai",
                                    "hiatus",
                                ]),
                                reviewd_by: users.map(function (u) { return u.id; })
                            }
                        })];
                case 9:
                    novel = _a.sent();
                    tag = 0;
                    _a.label = 10;
                case 10:
                    if (!(tag <= Math.ceil(Math.random() * 5))) return [3 /*break*/, 13];
                    return [4 /*yield*/, prisma_1["default"].tag_novel.create({
                            data: {
                                tag: faker_1.fakerID_ID.word.verb(),
                                novelId: novel.id
                            }
                        })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    tag++;
                    return [3 /*break*/, 10];
                case 13:
                    ch = 1;
                    _a.label = 14;
                case 14:
                    if (!(ch <= 2)) return [3 /*break*/, 17];
                    return [4 /*yield*/, prisma_1["default"].novel_chapter.create({
                            data: {
                                chapter: ch,
                                title: "Chapter ".concat(ch, ": ").concat(faker_1.fakerID_ID.lorem.words(2)),
                                content: faker_1.fakerID_ID.lorem.paragraphs(3),
                                novelId: novel.id,
                                views: faker_1.fakerID_ID.number.int({ min: 0, max: 1000 })
                            }
                        })];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16:
                    ch++;
                    return [3 /*break*/, 14];
                case 17:
                    _loop_1 = function (j) {
                        var user;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    user = users[j];
                                    return [4 /*yield*/, prisma_1["default"].novel_review.create({
                                            data: {
                                                rating: faker_1.fakerID_ID.number.int({ min: 1, max: 5 }),
                                                review: faker_1.fakerID_ID.lorem.sentences(2),
                                                novelId: novel.id,
                                                userId: user.id,
                                                likes: faker_1.fakerID_ID.number.int({ min: 0, max: 100 }),
                                                liked_by: users
                                                    .filter(function (u) { return u.id !== user.id; })
                                                    .map(function (u) { return u.id; })
                                            }
                                        })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    j = 0;
                    _a.label = 18;
                case 18:
                    if (!(j < 2)) return [3 /*break*/, 21];
                    return [5 /*yield**/, _loop_1(j)];
                case 19:
                    _a.sent();
                    _a.label = 20;
                case 20:
                    j++;
                    return [3 /*break*/, 18];
                case 21:
                    i++;
                    return [3 /*break*/, 8];
                case 22:
                    console.log("✅ novel created...", console.timeEnd("novel"));
                    console.log("✅ Seeding complete!");
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1["default"].$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
